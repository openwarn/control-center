import { Injectable } from '@angular/core';
import { CapAlert } from './cap-alert';
import * as xmlConverter from 'xml-js';
import * as moment from 'moment';
import { AlertInfo } from './alert-info';

@Injectable({
  providedIn: 'root'
})
export class CapXmlService {
 // 1995-12-17T02:24:00-00:00
 // 1995-12-17T03:24:00-00:00

  private static of(branch: any) {
    return new XmlBranch(branch);
  }

  private static formatDateTime(dateTime: Date) {
    return moment(dateTime).utc(false).format('YYYY-MM-DDThh:mm:ssZ').replace(/\+00:00$/, '-00:00');
  }

  constructor() { }

  convertCapAlertToXml(alert: CapAlert): string {
    const areas = [];

    if (alert.alertInfos.length > 0) {
      areas.push(
        {
          areaDescr: {
            _text: alert.alertInfos[0].areaDescription
          }
       }
      );
    }

    return xmlConverter.js2xml({
      _declaration: {
        _attributes: {
          version: '1.0',
          encoding: 'utf-8'
        }
      },
      alert: {
        _attributes: {
          xmlns: 'urn:oasis:names:tc:emergency:cap:1.2'
        },
        identifier: {
          _text: alert.alertId
        },
        sender: {
          _text: alert.senderId
        },
        sent: {
          // use UTC-00:00 as default time zone
          _text: CapXmlService.formatDateTime(alert.originatedAt)
        },
        msgType: {
          _text: alert.msgType
        },
        status: {
          _text: alert.status
        },
        scope: {
          _text: alert.scope
        },
        info: [
          {
            category: {
              _text: alert.category
            },
            event: {
              _text: alert.event
            },
            urgency: {
              _text: alert.urgency
            },
            severity: {
              _text: alert.severity
            },
            certainty: {
              _text: alert.certainty
            },
            area: areas
          }
        ]
      }
    }, {
      compact: true
    });
  }

  convertXmlToCapAlert(xml: string): CapAlert {
    const rawAlert: any = xmlConverter.xml2js(xml, {
      compact: true
    });
    console.log('xml alert as js object', xmlConverter.xml2json(xml, {compact: true }));

    const info = new AlertInfo();
    info.language = 'de-DE';
    // xml-js will resolve <info> either as array or as property depending on the number of elements
    const rawInfo = CapXmlService.of(rawAlert.alert.info).takeFirst();
    info.headline = rawInfo.headline._text;
    console.log(JSON.stringify(rawInfo));

    const rawArea = CapXmlService.of(rawInfo.area).takeFirst();
    info.areaDescription = rawArea.areaDesc._text;

    const alert = new CapAlert();
    alert.alertInfos.push(info);
    alert.alertId = rawAlert.alert.identifier._text;
    alert.senderId = rawAlert.alert.sender._text;
    alert.originatedAt = new Date(rawAlert.alert.sent._text);
    alert.msgType = rawAlert.alert.msgType._text;
    alert.status = rawAlert.alert.status._text;
    alert.scope = rawAlert.alert.scope._text;

    alert.category = rawInfo.category._text;
    alert.event = rawInfo.event._text;
    alert.urgency = rawInfo.urgency._text;
    alert.severity = rawInfo.severity._text;
    alert.certainty = rawInfo.certainty._text;

    return alert;
  }

}


class XmlBranch {
  private branch: any;

  constructor(branch) {
    this.branch = branch;
  }

  takeFirst() {
    if (this.branch instanceof Array) {
      // TODO: support multiple info segments
      return this.branch[0];
    } else {
      return this.branch;
    }
  }
}

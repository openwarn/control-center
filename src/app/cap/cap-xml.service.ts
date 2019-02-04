import { Injectable } from '@angular/core';
import { CapAlert } from './cap-alert';
import * as xmlConverter from 'xml-js';
import * as moment from 'moment';
import { AlertInfo } from './alert-info';

class XmlBranch {
  private branch: any;

  constructor(branch) {
    this.branch = branch;
  }

  text(defaultValue: string): string {
    if (this.branch && this.branch._text) {
      return this.branch._text;
    } else {
      return defaultValue;
    }
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

@Injectable({
  providedIn: 'root'
})
export class CapXmlService {

  private static of(branch: any) {
    return new XmlBranch(branch);
  }

  private static formatDateTime(dateTime: Date) {
    return moment(dateTime).utc(false).format('YYYY-MM-DDThh:mm:ssZ').replace(/\+00:00$/, '-00:00');
  }

  constructor() { }

  convertCapAlertToXml(alert: CapAlert): string {
    const firstInfoBlock: any = {
      category: {
        _text: alert.category
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
      area: []
    };

    if (alert.alertInfos.length > 0) {
      // required
      firstInfoBlock.language = {
        _text: alert.alertInfos[0].language
      };
      firstInfoBlock.headline = {
        _text: alert.alertInfos[0].headline
      };
      // optionals
      if (alert.alertInfos[0].areaDescription) {
        firstInfoBlock.area.push(
          {
            areaDesc: {
              _text: alert.alertInfos[0].areaDescription,
            }
        }
        );
      }
      if (alert.alertInfos[0].event) {
        firstInfoBlock.event = {
          _text: alert.alertInfos[0].event
        };
      }
      if (alert.alertInfos[0].description) {
        firstInfoBlock.description = {
          _text: alert.alertInfos[0].description
        };
      }
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
          firstInfoBlock
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
    info.headline = CapXmlService.of(rawInfo.headline).text('');
    info.event = CapXmlService.of(rawInfo.event).text('');

    const rawArea = CapXmlService.of(rawInfo.area).takeFirst();
    info.areaDescription = rawArea.areaDesc._text;

    return CapAlert.builder()
    .addInfoBlock(info)
    .alertId(rawAlert.alert.identifier._text)
    .senderId(rawAlert.alert.sender._text)
    .originatedAt(new Date(rawAlert.alert.sent._text))
    .msgType(rawAlert.alert.msgType._text)
    .status(rawAlert.alert.status._text)
    .scope(rawAlert.alert.scope._text)
    .category(rawInfo.category._text)
    .urgency(rawInfo.urgency._text)
    .severity(rawInfo.severity._text)
    .certainty(rawInfo.certainty._text)
    .build();

  }

}

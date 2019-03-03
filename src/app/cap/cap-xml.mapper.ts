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

  textOrDefault(defaultValue: string): string {
    if (this.branch && this.branch._text) {
      return this.branch._text;
    } else {
      return defaultValue;
    }
  }

  textOrUndefined(): string {
    if (this.branch && this.branch._text) {
      return this.branch._text;
    } else {
      return undefined;
    }
  }

  takeFirst() {
    if (this.branch instanceof Array) {
      return this.branch[0];
    } else {
      return this.branch;
    }
  }

  asArray() {
    if (this.branch instanceof Array) {
      return this.branch;
    } else {
      return [this.branch];
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CapXmlMapper {

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
          _text: CapXmlMapper.formatDateTime(alert.originatedAt)
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
    const alertBuilder = CapAlert.builder();

    const rawAlert: any = xmlConverter.xml2js(xml, {
      compact: true
    });

    // Browse through root alert element
    alertBuilder
    .alertId(rawAlert.alert.identifier._text)
    .senderId(rawAlert.alert.sender._text)
    .originatedAt(new Date(rawAlert.alert.sent._text))
    .msgType(rawAlert.alert.msgType._text)
    .status(rawAlert.alert.status._text)
    .scope(rawAlert.alert.scope._text)
    .note(CapXmlMapper.of(rawAlert.alert.note).textOrUndefined());

    // Browse through info elements
    const firstRawInfo = CapXmlMapper.of(rawAlert.alert.info).takeFirst();

    if (firstRawInfo) {
      alertBuilder
      .category(firstRawInfo.category._text)
      .urgency(CapXmlMapper.of(firstRawInfo.urgency).textOrDefault('Unknown'))
      .severity(CapXmlMapper.of(firstRawInfo.severity).textOrDefault('Unknown'))
      .certainty(CapXmlMapper.of(firstRawInfo.certainty).textOrDefault('Unknown'));

      CapXmlMapper.of(rawAlert.alert.info).asArray().forEach(
        (rawInfo) => {
          const info = new AlertInfo();
          info.headline = CapXmlMapper.of(rawInfo.headline).textOrDefault('');
          info.description = CapXmlMapper.of(rawInfo.description).textOrDefault('');
          info.event = CapXmlMapper.of(rawInfo.event).textOrDefault('');
          info.language = CapXmlMapper.of(rawInfo.language).textOrDefault('en-US');
          const rawArea = CapXmlMapper.of(rawInfo.area).takeFirst();
          info.areaDescription = rawArea.areaDesc._text;
          alertBuilder.addInfoBlock(info);
        }
      );
    }

    return alertBuilder.build();

  }

}

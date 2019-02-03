import { Injectable } from '@angular/core';
import { CapAlert } from './cap-alert';
import * as xmlConverter from 'xml-js';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CapXmlService {

  constructor() { }

  convertCapAlertToXml(alert: CapAlert): string {
    return xmlConverter.js2xml({
      _declaration: {
        _attributes: {
          version: '1.0',
          encoding: 'utf-8'
        }
      },
      alert: {
        identifier: {
          _text: alert.alertId
        },
        sender: {
          _text: alert.senderId
        },
        sent: {
          _text: moment(alert.originatedAt).format('YYYY-MM-DDThh:mm:ssXzh:zm')
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
            }
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
    console.log('xml alert as js object', rawAlert);

    const alert = new CapAlert();
    alert.alertId = rawAlert.alert.identifier._text;
    alert.senderId = rawAlert.alert.sender._text;
    alert.originatedAt = moment(rawAlert.alert.sent._text).toDate();
    alert.msgType = rawAlert.alert.msgType._text;
    alert.status = rawAlert.alert.status._text;
    alert.scope = rawAlert.alert.scope._text;
    alert.category = rawAlert.alert.info[0].category._text;
    alert.event = rawAlert.alert.info[0].event._text;
    alert.urgency = rawAlert.alert.info[0].urgency._text;
    alert.severity = rawAlert.alert.info[0].severity._text;
    alert.certainty = rawAlert.alert.info[0].certainty._text;

    return alert;
  }
}

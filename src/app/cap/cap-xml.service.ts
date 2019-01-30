import { Injectable } from '@angular/core';
import { CapAlert } from './cap-alert';
import * as xmlConverter from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class CapXmlService {

  constructor() { }

  convertCapAlertToXml(alert: CapAlert): string {
    return `<?xml version = "1.0" encoding = "UTF-8"?>
    <alert xmlns = "urn:oasis:names:tc:emergency:cap:1.2">
       <identifier>KAR0-0306112239-SW</identifier>
       <sender>KARO@CLETS.DOJ.CA.GOV</sender>
       <sent>2003-06-11T22:39:00-07:00</sent>
       <status>Actual</status>
       <msgType>Alert</msgType>
       <source>SW</source>
       <scope>Public</scope>
    </alert>`;
  }

  convertXmlToCapAlert(xml: string): CapAlert {
    const rawAlert: any = xmlConverter.xml2js(xml, {
      compact: true
    });
    console.log('xml alert as js object', rawAlert);

    const alert = new CapAlert();
    alert.alertId = rawAlert.alert.identifier._text;

    return alert;
  }
}

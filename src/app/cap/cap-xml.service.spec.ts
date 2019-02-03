import { TestBed } from '@angular/core/testing';
import { CapXmlService } from './cap-xml.service';
import { CapAlert } from './cap-alert';
import { AlertInfo } from './alert-info';
import * as moment from 'moment';

describe('CapXmlService', () => {
  let capXmlService: CapXmlService;

   beforeEach(() => {
      capXmlService = new CapXmlService();
   });

  it('should be created', () => {
    expect(capXmlService).toBeTruthy();
  });

  describe('moment.js', () => {

    it('should format to GMT', () => {
      const originalFormat = '2003-06-11T20:56:00-07:00';
      const dateTime = new Date(originalFormat);

      expect(moment(dateTime).utc().format('YYYY-MM-DDThh:mm:ss')).toBe('2003-06-12T03:56:00');
    });

  });

  describe('XML to CapAlert conversion', () => {

    it('should convert sample monolingual xml earthquake alert file to CapAlert', () => {
      const service: CapXmlService = TestBed.get(CapXmlService);
      const capAlert = service.convertXmlToCapAlert(getSampleEarthquakeAlertCapXML());

      expect(capAlert.alertId).toBe('TRI13970876.7');
      expect(capAlert.msgType).toBe('Update');
      expect(capAlert.event).toBe('Earthquake');
      expect(capAlert.category).toBe('Geo');
      expect(capAlert.certainty).toBe('Observed');
      expect(capAlert.severity).toBe('Minor');
      expect(capAlert.urgency).toBe('Past');

      expect(capAlert.alertInfos[0].headline).toBe('Some Earthquake Headline');
      expect(capAlert.alertInfos[0].areaDescription).toBe('Some Area');
    });

    it('should convert sample multilingual xml amber alert file to CapAlert', () => {
      const service: CapXmlService = TestBed.get(CapXmlService);
      const capAlert = service.convertXmlToCapAlert(getSampleMultilingualAmberAlertCapXML());

      expect(capAlert.alertId).toBe('XYZ-3243-LM');
      expect(capAlert.category).toBe('Rescue');
      expect(capAlert.certainty).toBe('Likely');
      expect(capAlert.severity).toBe('Severe');
      expect(capAlert.urgency).toBe('Immediate');

      expect(capAlert.alertInfos[0].headline).toBe('Amber Alert in Los Angeles County');
      expect(capAlert.alertInfos[0].areaDescription).toBe('Los Angeles County');
    });


  });

  describe('CapAlert to XML conversion', () => {
    it('should add xml version and encoding', () => {
      const alert = new CapAlert();
      alert.alertId = 'Any Alert Id';
      alert.category = 'Met';
      alert.certainty = 'Unknown';
      // Sun Dec 17 1995 03:24:00 GMT
      alert.originatedAt = new Date();
      alert.event = 'Any Event';
      alert.severity = 'Minor';
      alert.urgency = 'Unlikely';
      alert.msgType = 'Alert';
      alert.status = 'Actual';

      const xml = capXmlService.convertCapAlertToXml(alert);
      expect(xml).toContain('<?xml version="1.0" encoding="utf-8"?>');
      expect(xml).toContain('<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">');
    });

    it('should create xml from sample alert', () => {
      const infoGerman = new AlertInfo();
      infoGerman.language = 'de-DE';
      infoGerman.headline = 'Deutscher Titel';
      infoGerman.areaDescription = 'Irgendeine Ortsbeschreibung';

      const alert = new CapAlert();
      alert.alertId = 'Any Alert Id';
      alert.category = 'Met';
      alert.certainty = 'Unknown';
      // Sun Dec 17 1995 03:24:00 GMT
      alert.originatedAt = new Date('December 17, 1995 03:24:00 GMT');
      alert.event = 'Any Event';
      alert.severity = 'Minor';
      alert.urgency = 'Unlikely';
      alert.msgType = 'Alert';
      alert.status = 'Actual';
      alert.alertInfos.push(infoGerman);

      const xml = capXmlService.convertCapAlertToXml(alert);
      expect(xml).toContain('<identifier>Any Alert Id</identifier>');
      expect(xml).toContain('<sent>1995-12-17T03:24:00-00:00</sent>');
    });

  });

});

function getSampleMultilingualAmberAlertCapXML() {
  return `<?xml version = "1.0" encoding = "UTF-8"?>
<alert xmlns = "urn:oasis:names:tc:emergency:cap:1.2">
   <identifier>XYZ-3243-LM</identifier>
   <sender>KARO@CLETS.DOJ.CA.GOV</sender>
   <sent>2003-06-11T22:39:00-07:00</sent>
   <status>Actual</status>
   <msgType>Alert</msgType>
   <source>SW</source>
   <scope>Public</scope>
   <info>
     <language>en-US</language>
     <category>Rescue</category>
     <event>Child Abduction</event>
     <urgency>Immediate</urgency>
     <severity>Severe</severity>
     <certainty>Likely</certainty>
     <eventCode>
        <valueName>SAME</valueName>
        <value>CAE</value>
     </eventCode>
     <senderName>Los Angeles Police Dept - LAPD</senderName>
     <headline>Amber Alert in Los Angeles County</headline>
     <description>DATE/TIME: 06/11/03, 1915 HRS.  VICTIM(S): KHAYRI DOE JR. M/B BLK/BRO 3'0",
     40 LBS. LIGHT COMPLEXION.  DOB 06/24/01. WEARING RED SHORTS, WHITE T-SHIRT, W/BLUE COLLAR.
     LOCATION: 5721 DOE ST., LOS ANGELES, CA.  SUSPECT(S): KHAYRI DOE SR. DOB 04/18/71 M/B,
     BLK HAIR, BRO EYE. VEHICLE: 81' BUICK 2-DR, BLUE (4XXX000).</description>
     <contact>DET. SMITH, 77TH DIV, LOS ANGELES POLICE DEPT-LAPD AT 213 485-2389</contact>

     <area>
        <areaDesc>Los Angeles County</areaDesc>
        <geocode>
           <valueName>SAME</valueName>
           <value>006037</value>
        </geocode>
     </area>
   </info>
   <info>
     <language>es-US</language>
     <category>Rescue</category>
     <event>Abducción de Niño</event>
     <urgency>Immediate</urgency>
     <severity>Severe</severity>
     <certainty>Likely</certainty>
     <eventCode>
        <valueName>SAME</valueName>
        <value>CAE</value>
     </eventCode>
     <senderName>Departamento de Policía de Los Ángeles - LAPD</senderName>
     <headline>Alerta Amber en el condado de Los Ángeles</headline>
     <description>DATE/TIME: 06/11/03, 1915 HORAS. VÍCTIMAS: KHAYRI DOE JR. M/B BLK/BRO 3'0",
     40 LIBRAS. TEZ LIGERA. DOB 06/24/01. CORTOCIRCUITOS ROJOS QUE USAN, CAMISETA BLANCA,
      COLLAR DE W/BLUE. LOCALIZACIÓN: 5721 DOE ST., LOS ÁNGELES. SOSPECHOSO: KHAYRI DOE ST.
       DOB 04/18/71 M/B, PELO DEL NEGRO, OJO DE BRO. VEHÍCULO: 81' BUICK 2-DR, AZUL (4XXX000)</description>
     <contact>DET. SMITH, 77TH DIV, LOS ANGELES POLICE DEPT-LAPD AT 213 485-2389</contact>
     <area>
        <areaDesc>condado de Los Ángeles</areaDesc>
        <geocode>
           <valueName>SAME</valueName>
           <value>006037</value>
        </geocode>
     </area>
   </info>
</alert>`;
}

function getSampleEarthquakeAlertCapXML() {
   return `<?xml version = "1.0" encoding = "UTF-8"?>
   <alert xmlns = "urn:oasis:names:tc:emergency:cap:1.2">
     <identifier>TRI13970876.7</identifier>
     <sender>trinet@caltech.edu</sender>
     <sent>2003-06-11T20:56:00-07:00</sent>
     <status>Actual</status>
     <msgType>Update</msgType>
     <scope>Public</scope>
     <references>trinet@caltech.edu,TRI13970876.1,2003-06-11T20:30:00-07:00</references>
     <info>
       <category>Geo</category>
       <event>Earthquake</event>
       <urgency>Past</urgency>
       <severity>Minor</severity>
       <certainty>Observed</certainty>
       <senderName>Southern California Seismic Network (TriNet) operated by Caltech and USGS</senderName>
       <headline>Some Earthquake Headline</headline>
       <description>A minor earthquake measuring 3.4 on the Richter scale 
       occurred near Brawley, California at 8:30 PM Pacific Daylight Time on Wednesday,
       June 11, 2003. (This event has now been reviewed by a seismologist)</description>
       <web>http://www.trinet.org/scsn/scsn.html</web>
       <parameter>
         <valueName>EventID</valueName>
         <value>13970876</value>
       </parameter>
       <parameter>
         <valueName>Version</valueName>
         <value>1</value>
       </parameter>
       <parameter>
         <valueName>Magnitude</valueName>
         <value>3.4 Ml</value>
       </parameter>
       <parameter>
         <valueName>Depth</valueName>
         <value>11.8 mi.</value>
       </parameter>
       <parameter>
         <valueName>Quality</valueName>
         <value>Excellent</value>
       </parameter>
       <area>
         <areaDesc>Some Area</areaDesc>
         <circle>32.9525,-115.5527 0</circle>
       </area>
     </info>
   </alert>`;
 }

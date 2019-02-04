import { TestBed } from '@angular/core/testing';
import { CapXmlService } from './cap-xml.service';
import { CapAlert } from './cap-alert';
import { AlertInfo } from './alert-info';
import * as moment from 'moment';
// Test Resources
import * as earthquakeCap from './resources/test/earthquake.cap.xml';
import * as amberCap from './resources/test/amber.cap.xml';
import * as noHeadlineCap from './resources/test/no-headline.cap.xml';

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
      expect(capAlert.category).toBe('Geo');
      expect(capAlert.certainty).toBe('Observed');
      expect(capAlert.severity).toBe('Minor');
      expect(capAlert.urgency).toBe('Past');

      expect(capAlert.alertInfos[0].headline).toBe('Some Earthquake Headline');
      expect(capAlert.alertInfos[0].areaDescription).toBe('Some Area');
      expect(capAlert.alertInfos[0].event).toBe('Earthquake');
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

    it('should should tolerate a missing headline', ()  => {
      const service: CapXmlService = TestBed.get(CapXmlService);
      const capAlert = service.convertXmlToCapAlert(getAlertWithoutHeadline());

      expect(capAlert).toBeTruthy();
    });


  });

  describe('CapAlert to XML conversion', () => {
    it('should add xml version and encoding', () => {
      const alert = outlineBasicAlert().build();
      const xml = capXmlService.convertCapAlertToXml(alert);
      expect(xml).toContain('<?xml version="1.0" encoding="utf-8"?>');
      expect(xml).toContain('<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">');
    });

    it('should create xml from sample alert', () => {
      const alert = CapAlert.builder()
      .alertId('Any Alert Id')
      .category('Met')
      .certainty('Unknown')
      // Sun Dec 17 1995 03:24:00 GMT
      .originatedAt(new Date('December 17, 1995 03:24:00 GMT'))
      .severity('Minor')
      .urgency('Unlikely')
      .msgType('Alert')
      .status('Actual')
      .addInfoBlock(
        AlertInfo.builder()
        .event('Any Event')
        .language('de-DE')
        .headline('Deutscher Titel')
        .areaDescription('Irgendeine Ortsbeschreibung')
        .build()
      ).build();

      const xml = capXmlService.convertCapAlertToXml(alert);
      expect(xml).toContain('<identifier>Any Alert Id</identifier>');
      expect(xml).toContain('<sent>1995-12-17T03:24:00-00:00</sent>');
      expect(xml).toContain('<areaDesc>Irgendeine Ortsbeschreibung</areaDesc>');
      expect(xml).toContain('<headline>Deutscher Titel</headline>');
      expect(xml).toContain('<category>Met</category>');
      expect(xml).toContain('<certainty>Unknown</certainty>');
      expect(xml).toContain('<event>Any Event</event>');
      expect(xml).toContain('<severity>Minor</severity>');
      expect(xml).toContain('<urgency>Unlikely</urgency>');
      expect(xml).toContain('<msgType>Alert</msgType>');
      expect(xml).toContain('<status>Actual</status>');
      expect(xml).toContain('<language>de-DE</language>');
    });

  });

});

function outlineBasicAlert() {
  return CapAlert.builder()
  .alertId('Any Alert Id')
  .category('Met')
  .certainty('Unknown')
  .severity('Minor')
  .urgency('Unlikely')
  .msgType('Alert')
  .status('Actual')
  .originatedAt(new Date());
}

function getSampleMultilingualAmberAlertCapXML() {
  return amberCap.default;
}

function getSampleEarthquakeAlertCapXML() {
   return earthquakeCap.default;
}

function getAlertWithoutHeadline() {
  return noHeadlineCap.default;
}

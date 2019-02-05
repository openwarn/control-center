import { Injectable } from '@angular/core';
import { WebsocketListenerService } from './websocket/websocket-listener.service';
import { CapAlert } from './cap/cap-alert';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CapXmlService } from './cap/cap-xml.service';

@Injectable({
  providedIn: 'root'
})
export class ReceivedWarningService {
  private receivedWarnings: Array<CapAlert> = [];
  private $warnings:  BehaviorSubject<CapAlert[]> = new BehaviorSubject<CapAlert[]>([]);

  constructor(
    private websocketListenerService: WebsocketListenerService,
    private capXmlService: CapXmlService
  ) {
    this.websocketListenerService.topic(environment.services.webdisseminator.baseUrl, 'alert').subscribe(
      (alertXml) => {
        console.log('WarningFeedComponent', 'New Alert arrived');
        console.log('WarningFeedComponent', alertXml);
        try {
          const capAlert = this.capXmlService.convertXmlToCapAlert(alertXml);
          this.receivedWarnings.push(capAlert);
          this.$warnings.next(this.receivedWarnings);
        } catch (error) {
          console.error('WarningFeedComponent', 'Could not convert cap xml', error);
        }
      });
  }

  warnings(): Observable<CapAlert[]> {
    return this.$warnings;
  }
}

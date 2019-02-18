import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CapAlert } from './cap-alert';
import { WebsocketListenerService } from '../websocket/websocket-listener.service';
import { CapXmlService } from './cap-xml.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlertListenerService {
  private $alert:  Subject<CapAlert> = new Subject<CapAlert>();

  constructor(
    private websocketListenerService: WebsocketListenerService,
    private capXmlService: CapXmlService
  ) {
    this.websocketListenerService.topic(environment.services.webdisseminator.baseUrl, 'alert').subscribe(
      (alertXml) => {
        try {
          const capAlert = this.capXmlService.convertXmlToCapAlert(alertXml);
          this.$alert.next(capAlert);
        } catch (error) {
          console.error('AlertListener', 'Could not convert cap xml', error);
        }
      });
  }

  alert(): Observable<CapAlert> {
    return this.$alert;
  }
}

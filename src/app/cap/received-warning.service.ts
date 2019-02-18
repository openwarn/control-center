import { Injectable } from '@angular/core';
import { WebsocketListenerService } from '../websocket/websocket-listener.service';
import { CapAlert } from './cap-alert';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CapXmlService } from './cap-xml.service';
import { AlertListenerService } from './alert-listener.service';

@Injectable({
  providedIn: 'root'
})
export class ReceivedWarningService {
  private receivedWarnings: Array<CapAlert> = [];
  private $warnings:  BehaviorSubject<CapAlert[]> = new BehaviorSubject<CapAlert[]>([]);

  constructor(
    private alertListenerService: AlertListenerService
  ) {
    this.alertListenerService.alert().subscribe(
      (alert) => {
        this.receivedWarnings.push(alert);
        this.$warnings.next(this.receivedWarnings);
      },
      (error: any) => {
        console.error('ReceivedWarningService', 'Failed to receive alert', error);
      }
    );
  }

  warnings(): Observable<CapAlert[]> {
    return this.$warnings;
  }
}

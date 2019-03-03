import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapDeliveryService } from './cap-delivery.service';
import { CapXmlMapper } from './cap-xml.mapper';
import { ReceivedWarningService } from './received-warning.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { PendingWarningService } from './pending-warning.service';
import { AlertListenerService } from './alert-listener.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WebsocketModule
  ],
  providers: [
    CapDeliveryService,
    CapXmlMapper,
    ReceivedWarningService,
    AlertListenerService,
    PendingWarningService
  ]
})
export class CapModule { }

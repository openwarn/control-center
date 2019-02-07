import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapDeliveryService } from './cap-delivery.service';
import { CapXmlService } from './cap-xml.service';
import { ReceivedWarningService } from './received-warning.service';
import { WebsocketModule } from '../websocket/websocket.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WebsocketModule
  ],
  providers: [
    CapDeliveryService,
    CapXmlService,
    ReceivedWarningService
  ]
})
export class CapModule { }

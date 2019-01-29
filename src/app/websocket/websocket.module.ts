import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketListenerService } from './websocket-listener.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WebsocketListenerService
  ]
})
export class WebsocketModule { }

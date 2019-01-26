import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapDeliveryService } from './cap-delivery.service';
import { CapXmlService } from './cap-xml.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CapDeliveryService,
    CapXmlService
  ]
})
export class CapModule { }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebsocketListenerService } from '../websocket/websocket-listener.service';
import { Subscription } from 'rxjs';

interface FeedItem {
  warningId: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-warning-feed',
  templateUrl: './warning-feed.component.html',
  styleUrls: ['./warning-feed.component.scss']
})
export class WarningFeedComponent implements OnInit, OnDestroy {

  private birdSubscription: Subscription;

  private items: Array<FeedItem> = [
    {
      warningId: 'US-23423432',
      title: 'Winter Storm Warning for Mackenzie Delta and Arctic Coast areas of the Northwest Territories',
      description: `Heavy snow with total amounts near 15 centimetres is expected.
      This afternoon, northwesterly winds of 30 km/h gusting to 60 will 
      develop reducing visibilities in blowing snow, especially in exposed areas. 
      Snow and blowing snow will taper off Wednesday morning.`
    },
    {
      warningId: 'AU-546456',
      title: 'Bushfire Advice: Viney Creek East Rd, Tea Gardens',
      description: `ALERT LEVEL: Advice
      LOCATION: Viney Creek East Rd, Tea Gardens, NSW 2324
      COUNCIL AREA: Mid-Coast
      STATUS: Under control
      TYPE: Bush Fire
      FIRE: Yes
      SIZE: 0 ha
      RESPONSIBLE AGENCY: Rural Fire Service`
    },
  ];

  constructor(
    private websocketListenerService: WebsocketListenerService
  ) {}

  ngOnInit() {
    this.birdSubscription = this.websocketListenerService.topic(environment.services.nodeDummy.baseUrl, 'birds').subscribe(
      (msg) => console.log('msg arrived at feed', msg)
    );
  }

  ngOnDestroy() {
    this.birdSubscription.unsubscribe();
  }

}

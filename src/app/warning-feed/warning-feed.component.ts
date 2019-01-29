import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebsocketListenerService } from '../websocket/websocket-listener.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warning-feed',
  templateUrl: './warning-feed.component.html',
  styleUrls: ['./warning-feed.component.scss']
})
export class WarningFeedComponent implements OnInit, OnDestroy {

  private birdSubscription: Subscription;

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

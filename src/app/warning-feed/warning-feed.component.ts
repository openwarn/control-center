import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ReceivedWarningService } from '../received-warning.service';
import { CapAlert } from '../cap/cap-alert';

@Component({
  selector: 'app-warning-feed',
  templateUrl: './warning-feed.component.html',
  styleUrls: ['./warning-feed.component.scss']
})
export class WarningFeedComponent {

  items: Observable<CapAlert[]>;

  constructor(
    private receivedWarningService: ReceivedWarningService
  ) {
    this.items = receivedWarningService.warnings();
  }


}

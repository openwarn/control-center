import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceivedWarningService } from '../cap/received-warning.service';
import { CapAlert } from '../cap/cap-alert';
import { PendingWarningService } from '../cap/pending-warning.service';

@Component({
  selector: 'app-warning-feed',
  templateUrl: './warning-feed.component.html',
  styleUrls: ['./warning-feed.component.scss']
})
export class WarningFeedComponent {

  pendingItems: Observable<CapAlert[]>;
  items: Observable<CapAlert[]>;

  constructor(
    private receivedWarningService: ReceivedWarningService,
    private pendingWarningService: PendingWarningService
  ) {
    this.pendingItems = this.pendingWarningService.pendingWarnings();
    this.items = this.receivedWarningService.warnings();
  }


}

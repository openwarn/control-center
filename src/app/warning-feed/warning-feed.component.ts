import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceivedWarningService } from '../cap/received-warning.service';
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
    this.items = this.receivedWarningService.warnings();
  }


}

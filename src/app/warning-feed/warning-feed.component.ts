import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceivedWarningService } from '../cap/received-warning.service';
import { CapAlert } from '../cap/cap-alert';
import { PendingWarningService } from '../cap/pending-warning.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

moment.locale(environment.locale);

function orderByPreferredLanguages(preferedLanguages: Array<string>) {
  return pipe(
    map<CapAlert[], any>(
      (items) => items.map(
        (alert) => {
          const orderedinfoBlocks = alert.alertInfos.sort(
            (a, b) => {
              // Sort elements in a way, that info blocks with prefered languages come first
              const aIdx = preferedLanguages.indexOf(a.language.split('-')[0]);
              const bIdx = preferedLanguages.indexOf(b.language.split('-')[0]);

              return - aIdx + bIdx;
            }
          );
          alert.alertInfos = orderedinfoBlocks;
          return alert;
        }
      )
    )
  );
}

@Component({
  selector: 'app-warning-feed',
  templateUrl: './warning-feed.component.html',
  styleUrls: ['./warning-feed.component.scss']
})
export class WarningFeedComponent {

  pendingItems: Observable<CapAlert[]>;
  items: Observable<CapAlert[]>;
  moment = moment;

  constructor(
    private receivedWarningService: ReceivedWarningService,
    private pendingWarningService: PendingWarningService
  ) {
    this.pendingItems = this.pendingWarningService.pendingWarnings().pipe(
      map(
        (items) => items.sort((a, b) => b.originatedAt.valueOf() - a.originatedAt.valueOf())
      )
    );
    this.items = this.receivedWarningService.warnings().pipe(
      map(
        (items) => items.sort((a, b) => b.originatedAt.valueOf() - a.originatedAt.valueOf())
      ),
      orderByPreferredLanguages(environment.preferedLanguages)
    );
  }

}

import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReceivedWarningService } from '../cap/received-warning.service';

@Component({
  selector: 'app-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.scss']
})
export class SiteNavigationComponent {

  @Input() title: string;
  $numberOfWarnings: Observable<number>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private receivedWarningService: ReceivedWarningService
  ) {
    this.$numberOfWarnings = this.receivedWarningService.warnings()
    .pipe(
      map(
        (alerts) => alerts.length
      )
    );
  }

}

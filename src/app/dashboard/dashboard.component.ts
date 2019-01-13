import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HealthStatusBoardComponent } from '../monitoring/health-status-board/health-status-board.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  entryComponents: [HealthStatusBoardComponent]
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Systemstatus', cols: 2, rows: 1, component: HealthStatusBoardComponent }
        ];
      }

      return [
        { title: 'Systemstatus', cols: 1, rows: 1, component: HealthStatusBoardComponent }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}

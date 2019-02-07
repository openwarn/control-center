import { Component, OnInit } from '@angular/core';
import { HealthStatusService } from '../health-status.service';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HealthStatus } from '../health-status.enum';

class StatusItem {
  status: Observable<HealthStatus>;
  name: string;
}

@Component({
  selector: 'app-health-status-board',
  templateUrl: './health-status-board.component.html',
  styleUrls: ['./health-status-board.component.scss']
})
export class HealthStatusBoardComponent implements OnInit {

  serviceStatus: Array<StatusItem>;

  constructor(
    private healthStatusService: HealthStatusService
  ) {
    this.serviceStatus = Object.keys(environment.services).map(
      (serviceName) => {
        return {
          status: this.healthStatusService.service(environment.services[serviceName].baseUrl),
          name: serviceName
        };
      }
    );
  }

  ngOnInit() {
  }
}

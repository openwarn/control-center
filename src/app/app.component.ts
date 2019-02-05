import { Component } from '@angular/core';
import { ReceivedWarningService } from './received-warning.service';
import { Observable } from 'rxjs';
import { CapAlert } from './cap/cap-alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kontrollzentrum';

  private receivedWarnings: Observable<CapAlert[]>;

  constructor(private receivedWarningService: ReceivedWarningService) {
    this.receivedWarnings = receivedWarningService.warnings();
    this.receivedWarnings.subscribe(
      (alert) => {
        console.info('AppComponent: Warning received', alert);
      },
      (error) => console.error(error)
    );
  }
}

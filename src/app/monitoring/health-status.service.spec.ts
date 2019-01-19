import { TestBed } from '@angular/core/testing';

import { HealthStatusService } from './health-status.service';
import { HttpClientModule } from '@angular/common/http';

describe('HealthStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: HealthStatusService = TestBed.get(HealthStatusService);
    expect(service).toBeTruthy();
  });

  it('should emit event if status has changed', () => {
    // TODO
  });

  it('should not emit event if status is unchanged', () => {
    // TODO
  });
});

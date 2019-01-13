import { TestBed } from '@angular/core/testing';

import { HealthStatusService } from './health-status.service';

describe('HealthStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

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

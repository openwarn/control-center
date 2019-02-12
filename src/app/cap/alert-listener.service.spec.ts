import { TestBed } from '@angular/core/testing';

import { AlertListenerService } from './alert-listener.service';

describe('AlertListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertListenerService = TestBed.get(AlertListenerService);
    expect(service).toBeTruthy();
  });
});

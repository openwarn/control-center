import { TestBed } from '@angular/core/testing';

import { ReceivedWarningService } from './received-warning.service';

describe('ReceivedWarningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceivedWarningService = TestBed.get(ReceivedWarningService);
    expect(service).toBeTruthy();
  });
});

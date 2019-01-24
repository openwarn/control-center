import { TestBed } from '@angular/core/testing';

import { CapDeliveryService } from './cap-delivery.service';
import { HttpClientModule } from '@angular/common/http';

describe('CapDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: CapDeliveryService = TestBed.get(CapDeliveryService);
    expect(service).toBeTruthy();
  });

  it('should send xml via http client', () => {
    // TODO: implement
  });
});

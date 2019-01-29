import { TestBed } from '@angular/core/testing';

import { WebsocketListenerService } from './websocket-listener.service';

describe('WebsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketListenerService = TestBed.get(WebsocketListenerService);
    expect(service).toBeTruthy();
  });

});

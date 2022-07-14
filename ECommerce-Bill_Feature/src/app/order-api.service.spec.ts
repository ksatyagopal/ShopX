import { TestBed } from '@angular/core/testing';

import { OrderAPIService } from './order-api.service';

describe('OrderAPIService', () => {
  let service: OrderAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

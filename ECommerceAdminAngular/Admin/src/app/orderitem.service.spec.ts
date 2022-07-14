import { TestBed } from '@angular/core/testing';

import { OrderitemService } from './orderitem.service';

describe('OrderitemService', () => {
  let service: OrderitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

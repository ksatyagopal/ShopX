import { TestBed } from '@angular/core/testing';

import { User1Service } from './user1.service';

describe('User1Service', () => {
  let service: User1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChangesService } from './changes.service';

describe('ChangesService', () => {
  let service: ChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

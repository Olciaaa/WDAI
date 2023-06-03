import { TestBed } from '@angular/core/testing';

import { DataForFilterService } from './data-for-filter.service';

describe('DataForFilterService', () => {
  let service: DataForFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataForFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

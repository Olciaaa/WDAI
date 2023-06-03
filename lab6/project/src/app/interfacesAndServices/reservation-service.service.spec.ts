import { TestBed } from '@angular/core/testing';

import { ReservationServiceService } from './reservation-service.service';

describe('ReservationServiceService', () => {
  let service: ReservationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

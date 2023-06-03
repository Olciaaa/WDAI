import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPriceComponent } from './trip-price.component';

describe('TripPriceComponent', () => {
  let component: TripPriceComponent;
  let fixture: ComponentFixture<TripPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtTripsComponent } from './bought-trips.component';

describe('BoughtTripsComponent', () => {
  let component: BoughtTripsComponent;
  let fixture: ComponentFixture<BoughtTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoughtTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripButtonsComponent } from './trip-buttons.component';

describe('TripButtonsComponent', () => {
  let component: TripButtonsComponent;
  let fixture: ComponentFixture<TripButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

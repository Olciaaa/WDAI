import { Component, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
interface review {
  tripName: string;
  nick: string;
  date: string;
  review: string;
}
@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.scss']
})

export class RateFormComponent {
  constructor() {}

  reviews: review[] = [];
  errorArray: any[] = [];
  @Output() newReviewEvent = new EventEmitter<review>();

  addReview = new FormGroup({
    tripName: new FormControl('', [
      Validators.required
    ]),
    nickname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    date: new FormControl('', []),
    review: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(300),
    ]),
  });

  submitForm() {
    let newReview = ({
      tripName: this.addReview.get('tripName')!.value,
      nick: this.addReview.get('nickname')!.value,
      date: this.addReview.get('date')!.value,
      review: this.addReview.get('review')!.value,
    } as review);

    this.newReviewEvent.emit(newReview)
    this.addReview.reset();
  }

  ngOnInit(): void {}
}

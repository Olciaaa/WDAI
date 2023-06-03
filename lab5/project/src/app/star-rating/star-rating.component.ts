import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  private readonly MAX_NUMBER_OF_STARS = 5;

  @Input() rating:number = 0;

  @Output() ratingShare:EventEmitter<number> = new EventEmitter<number>();

  private get numberOfFullStars(): number {
    return Math.floor(this.rating);
  }

  private get numberOfEmptyStars(): number {
    return this.MAX_NUMBER_OF_STARS - Math.ceil(this.rating);
  }

  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }

  changeStars(id:number, flag:boolean){
    this.rating = flag?this.numberOfFullStars + id + 1:id + 1;
  }

  shareRate(){
    this.ratingShare.emit(this.rating);
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { IFilters } from './filters';
import { ITrip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class DataForFilterService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  filter$: Observable<IFilters>;
  private myFilterSubject = new Subject<IFilters>();
  
  constructor() { 
    this.myMethod$ = this.myMethodSubject.asObservable();
    this.filter$ = this.myFilterSubject.asObservable();
  }
  
  createListForFilter(trips:ITrip[]){
    let data:any = {
      placeRange:trips.map(o => o.place),
      startDate:[trips.map(o => o.startDate).reduce(function (a, b) { return a < b ? a : b; }), trips.map(o => o.startDate).reduce(function (a, b) { return a > b ? a : b; })],
      endDate:[trips.map(o => o.endDate).reduce(function (a, b) { return a < b ? a : b; }), trips.map(o => o.endDate).reduce(function (a, b) { return a > b ? a : b; })],
      price:[Math.min(...trips.map(o => o.price)), Math.max(...trips.map(o => o.price))],
      grade: [0, 1, 2, 3, 4, 5]
    }

    this.myMethodSubject.next(data);
  }

  filters(filter:IFilters){
    this.myFilterSubject.next(filter);
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITrip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  //amountOfRerserved, price, maxMembers
  data:{[index: string]: number[]} = {};
  
  constructor() { 
    this.myMethod$ = this.myMethodSubject.asObservable();
  }
  
  generateNamesList(names:ITrip[]){
    let data:{[index: string]: number[]}= {}
    for (const el of names) {
      data[el.name] = [0, el.price, el.maxParticipants];
    }
    this.data = data;
    this.myMethodSubject.next(data);
  }

  addPlace(trip:ITrip){
    if(!(trip.name in this.data)){
      this.data[trip.name] = [0, trip.price, trip.maxParticipants];
    }
    this.myMethodSubject.next(this.data);
  }

  removePlace(trip:any){
    if((trip in this.data)){
      delete this.data[trip];
    }
    this.myMethodSubject.next(this.data);
  }

  reserveTrip(trip:string){
    this.data[trip][0] += 1;
    this.myMethodSubject.next(this.data);
  }

  unreserveTrip(trip:string){
    this.data[trip][0] -= 1;
    this.myMethodSubject.next(this.data);
  }
}

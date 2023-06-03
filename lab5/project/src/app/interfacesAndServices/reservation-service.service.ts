import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { ITrip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  //amountOfRerserved, price, maxMembers, tickets bought, buyDay - 4, buyMonth - 5, buyYear - 6
  data:{[index: string]: number[]} = {};
  
  constructor() { 
    this.myMethod$ = this.myMethodSubject.asObservable();
  }
  
  generateNamesList(names:ITrip[]){
    let data:{[index: string]: number[]}= {}
    for (const el of names) {
      data[el.name] = [0, el.price, el.maxParticipants, 0, 0, 0, 0];
    }
    this.data = data;
    this.myMethodSubject.next(data);
  }

  getReserved():{[index:string]:number[]}{
    return this.data;
  }

  addPlace(trip:ITrip){
    if(!(trip.name in this.data)){
      this.data[trip.name] = [0, trip.price, trip.maxParticipants, 0, 0, 0, 0];
    }
    this.myMethodSubject.next(this.data);
  }

  removePlace(trip:any){
    if((trip in this.data)){
      delete this.data[trip];
    }
    this.myMethodSubject.next(this.data);
    console.log(this.data);
  }

  reserveTrip(trip:string){
    this.data[trip][0] += 1;
    this.myMethodSubject.next(this.data);
  }

  unreserveTrip(trip:string){
    this.data[trip][0] -= 1;
    this.myMethodSubject.next(this.data);
  }

  buyTrip(trip:string){
    this.data[trip][3] = this.data[trip][3] + this.data[trip][0];
    this.data[trip][2] = this.data[trip][2] - this.data[trip][0];
    this.data[trip][0] = 0;
    const d = new Date();
    console.log(d)
    this.data[trip][4] = d.getDate();
    this.data[trip][5] = d.getMonth() + 1;
    this.data[trip][6] = d.getFullYear();
    console.log(this.data);
    this.myMethodSubject.next(this.data);
  }
}

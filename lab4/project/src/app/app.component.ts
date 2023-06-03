import { Component, OnInit } from '@angular/core';
import data from 'src/assets/data.json'
import { ITrip } from './interfacesAndServices/trip';
import { DatePipe } from '@angular/common';
import { DataForFilterService } from './interfacesAndServices/data-for-filter.service';
import { IFilters } from './interfacesAndServices/filters';
import { ReservationServiceService } from './interfacesAndServices/reservation-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'project';
  todayDate : Date = new Date();
  trips: ITrip[] = [];
  reserved:{[index:string]:number[]} = {};
  currentId:number;
  reservedTrips: number = 0;
  color:string;

  constructor(public datepipe: DatePipe, private list:DataForFilterService, private reservationService:ReservationServiceService){
    this.reservationService.myMethod$.subscribe((data) => {
      this.reserved = data;
      this.reservedTrips = Object.values(this.reserved).reduce((a, b) => a + b[0], 0);
      this.color = this.reservedTrips >= 10?"#00b300":"rgb(255, 49, 84)";
    }
  ); 
  }
  
  ngOnInit():void{
    let i = 0;
    for (const trip of data) {
      this.trips.push({
        id:i,
        name:trip.name,
        place:trip.place,
        startDate:new Date(trip.startDate),
        endDate:new Date(trip.endDate),
        price:Number(trip.price),
        maxParticipants: Number(trip.maxParticipants),
        picture: trip.picture,
        description: trip.description,
        grade: 0
      })
      i++;
    }
    this.currentId = this.trips.length;
    this.list.createListForFilter(this.trips);
    this.reservationService.generateNamesList(this.trips);
  }

  addTrip(newTrip:ITrip):void{
    this.trips.push(newTrip);
    this.currentId += 1;
    this.list.createListForFilter(this.trips);
    this.reservationService.addPlace(newTrip);
  }

  removeTrip(id:number):void{
    this.reservationService.removePlace(this.trips.find(o => o.id == id)?.name.toString());
    
    this.trips = this.trips.filter(obj => obj.id !== id);
    console.log(this.trips);
    
    if(this.trips.length > 0){this.list.createListForFilter(this.trips)}
  }
}

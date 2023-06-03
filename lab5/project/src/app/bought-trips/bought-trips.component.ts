import { Component, OnInit } from '@angular/core';
import { DataService } from '../interfacesAndServices/data.service';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';
import { StatusFilterPipe } from '../interfacesAndServices/status-filter.pipe';
import { ITrip } from '../interfacesAndServices/trip';

@Component({
  selector: 'app-bought-trips',
  templateUrl: './bought-trips.component.html',
  styleUrls: ['./bought-trips.component.scss']
})
export class BoughtTripsComponent implements OnInit{
  trips:ITrip[];
  reserved:{[index:string]:number[]} = {};
  data: {[index:string]:any[]} = {};
  currency:string;
  today:Date = new Date();
  stateFilter:boolean[] = [true, true, true]
  states:string[] = ["active", "waiting", "ended"]

  constructor(private dataService:DataService, private reservationService:ReservationServiceService){
    this.dataService.data$.subscribe((data)=>{
      this.trips = data;
      this.prepareData();
    })

    this.reservationService.myMethod$.subscribe((data) => {
      this.reserved = data;
      this.prepareData();
    })

    this.dataService.currency$.subscribe((data)=>{
      this.currency = data;
      this.prepareData();
    })
  }

  ngOnInit(){
    this.trips = this.dataService.getData();
    this.reserved = this.reservationService.getReserved();
    this.prepareData();
  }

  prepareData(){
    for (let key of Object.keys(this.reserved)) {
      let trip:ITrip = this.trips[this.trips.findIndex(el => el.name == key)]

      // ( oczekiwania na rozpoczęcie), w trakcie ( aktywna), zakończona ( archiwalna). 

      let state:string = "active";
      if(new Date() > trip.endDate){
        state = "ended";
      }
      if(new Date() < trip.startDate){
        state = "waiting"
      }

      this.data[key] = [trip.name, this.dataService.changePrice(trip.price * this.reserved[key][3]), trip.startDate, trip.endDate, trip.place,       
      this.reserved[key][3], this.reserved[key][4], this.reserved[key][5], this.reserved[key][6], state];
    }
  }
  changeFilter(id:number){
    this.stateFilter[id] = !this.stateFilter[id]
    console.log(this.stateFilter)
  }
}

import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { DataForFilterService } from '../interfacesAndServices/data-for-filter.service';
import { DataService } from '../interfacesAndServices/data.service';
import { FilterPipePipe } from '../interfacesAndServices/filter-pipe.pipe';
import { IFilters } from '../interfacesAndServices/filters';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';
import { ITrip } from '../interfacesAndServices/trip';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnChanges{
  trips:ITrip[];
  colors:{[key:number]:string} = {};
  minPrice:number;
  maxPrice:number;
  filters:IFilters;
  reserved:{[index:string]:number[]} = {};
  reservedTrips: number = 0;
  color:string;

  loginToken:[boolean, string];
  type:string;

  constructor(private filterService:DataForFilterService, private dataService:DataService, private reservationService:ReservationServiceService){
    this.filterService.filter$.subscribe((data) => {
      this.filters = data;
    }); 

    this.dataService.data$.subscribe((data)=>{
      this.trips = data;
      this.findPricesMinMax();
    })

    this.reservationService.myMethod$.subscribe((data) => {
      this.reserved = data;
      this.reservedTrips = Object.values(this.reserved).reduce((a, b) => a + b[0], 0);
      this.color = this.reservedTrips >= 10?"rgba(23,128,109,0.9)":"rgba(255, 99, 71, 0.9)";
    })

    this.loginToken = this.dataService.logT;
    console.log(this.loginToken);
    this.setLogin();
    this.dataService.loginToken$.subscribe((data) => {
        console.log(data);
        this.loginToken = data;
        this.setLogin();
      }
    ); 
  }

  ngOnInit(){
    (async () => {
      this.trips = await this.dataService.getData();
      this.filters = await this.filterService.getFilter();
      this.findPricesMinMax();
  
      this.reserved = await this.reservationService.getReserved();
      this.reservedTrips = Object.values(this.reserved).reduce((a, b) => a + b[0], 0);
      this.color = this.reservedTrips >= 10?"rgba(23,128,109,0.9)":"rgba(255, 99, 71, 0.9)";
    })();
  }

  setLogin(){
    this.type = "";
    if(this.loginToken[0]){
      Object.entries(jwt_decode(this.loginToken[1])!).forEach(
        ([key, value]) => {
          if(key == "user_type"){
            this.type = value;
          }
        }
      );
    }
  }

  ngOnChanges():void{
    this.findPricesMinMax();
  }

  findPricesMinMax():void{
    if(this.trips.length > 0){
      let tym = this.trips.map(x => ({"id":x.id, "price":x.price}));
      tym.sort((a, b) => a.price - b.price);
      this.minPrice = tym[0].price;
      this.maxPrice = tym[tym.length - 1].price;
      this.setBorderColors();
    }
  }

  setBorderColors():void{
    this.colors = {};
    for (const el of this.trips) {
      if(el.price == this.minPrice){
        this.colors[el.id] = "green";
      }
      else if(el.price == this.maxPrice){
        this.colors[el.id] = "red";
      }
      else{
        this.colors[el.id] = "pink";
      }
    }
    console.log(this.colors)
  }
}

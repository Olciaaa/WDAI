import { identifierName } from '@angular/compiler';
import { Component, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../interfacesAndServices/data.service';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  reservedTrips:{[index:string]:number[]} = {};
  color:string;
  value:number = 0;
  numberOfTrips:number = 0;
  price:number;
  currency:string;

  constructor(private reservationService:ReservationServiceService, private dataService:DataService){
    this.reservationService.myMethod$.subscribe((data) => {
      this.reservedTrips = {};
      for (let key of Object.keys(data)) {
        if(data[key][0] > 0){
          this.reservedTrips[key] = data[key];
        }
      }
      this.value = Object.values(this.reservedTrips).reduce((a, b) => a + (b[0] * b[1]), 0);
      this.numberOfTrips = Object.values(this.reservedTrips).reduce((a, b) => a + b[0], 0);
      console.log(this.value)
      this.price = this.dataService.changePrice(this.value);
    }); 

    this.dataService.currency$.subscribe((data)=>{
      this.currency = data;
      this.price = this.dataService.changePrice(this.value);
    })
  }

  ngOnInit(){
    let data = this.reservationService.getReserved();
    this.reservedTrips = {};
    for (let key of Object.keys(data)) {
      if(data[key][0] > 0){
        this.reservedTrips[key] = data[key];
      }
    }
    this.value = Object.values(this.reservedTrips).reduce((a, b) => a + (b[0] * b[1]), 0);
    this.numberOfTrips = Object.values(this.reservedTrips).reduce((a, b) => a + b[0], 0);

    this.currency = this.dataService.getCurrency();
    this.price = this.dataService.changePrice(this.value);
  }

  buyAll(){
    for (let key of Object.keys(this.reservedTrips)) {
      this.buyTrip(key);
    }    
  }

  buyTrip(name:string){
    let num:number = this.reservedTrips[name][3]
    this.reservationService.buyTrip(name);
    this.dataService.buyTrip(name, num);
    this.value = Object.values(this.reservedTrips).reduce((a, b) => a + (b[0] * b[1]), 0);
  }
}

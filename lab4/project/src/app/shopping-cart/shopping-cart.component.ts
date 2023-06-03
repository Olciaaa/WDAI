import { identifierName } from '@angular/compiler';
import { Component, Input, SimpleChanges } from '@angular/core';
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

  constructor(private reservationService:ReservationServiceService){
    this.reservationService.myMethod$.subscribe((data) => {
      this.reservedTrips = {};
      for (let key of Object.keys(data)) {
        if(data[key][0] > 0){
          this.reservedTrips[key] = data[key];
        }
      }
      this.value = Object.values(this.reservedTrips).reduce((a, b) => a + (b[0] * b[1]), 0);
      this.numberOfTrips = Object.values(this.reservedTrips).reduce((a, b) => a + b[0], 0);
    }); 
  }
}

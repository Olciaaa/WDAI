import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../interfacesAndServices/data.service';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';
import jwt_decode from "jwt-decode";

interface review {
  tripName: string;
  nick: string;
  date: string;
  review: string;
}
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent {
  trip:any;
  startDate:any;
  endDate:any;
  currentAvailableMembers:number;
  tripRates:number[] = [];
  private subscription: Subscription | undefined
  id: number;
  price:number;
  currency:string;
  reviews: review[] = []

  loginToken:[boolean, string];
  type:string;
  banned:number = 0;

  constructor(private route: ActivatedRoute, public datepipe: DatePipe, private resService: ReservationServiceService, private dataService: DataService){
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.dataService.currency$.subscribe((data)=>{
      this.currency = data;
      this.price = this.dataService.changePrice(this.trip.price);
    })
    this.trip = dataService.getData().find(element => element.id == this.id);
    
    this.loginToken = this.dataService.logT;
    this.setLogin();
    this.dataService.loginToken$.subscribe((data) => {
        console.log(data);
        this.loginToken = data;
        this.setLogin();
      }
    ); 
  }

  ngOnInit(): void {
    this.startDate = this.datepipe.transform(this.trip.startDate, 'dd/MM/yyyy')
    this.endDate = this.datepipe.transform(this.trip.endDate, 'dd/MM/yyyy')

    this.currentAvailableMembers = this.resService.getReserved()[this.trip.name][2] - this.resService.getReserved()[this.trip.name][0];
    this.currency = this.dataService.getCurrency();
    this.price = this.dataService.changePrice(this.trip.price);
  }

  setLogin(){
    console.log(jwt_decode(this.loginToken[1]))
    this.type = "";
    if(this.loginToken[0]){
      Object.entries(jwt_decode(this.loginToken[1])!).forEach(
        ([key, value]) => {
          if(key == "user_type"){
            this.type = value;
          }
          if(key == "user_banned"){
            this.banned = value;
          }
        }
      );
    }

    //console.log(this.type)
  }

  changeMembers(members:number){
    this.currentAvailableMembers = members;
  }

  newTripRate(rate:number){
    this.dataService.rateTrip(this.id, rate);
  }

  addReview(newReview: review){
    this.reviews.push(newReview);
  }
}

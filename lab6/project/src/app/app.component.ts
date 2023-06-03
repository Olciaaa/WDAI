import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import data from 'src/assets/data.json'
import { ITrip } from './interfacesAndServices/trip';
import { DatePipe } from '@angular/common';
import { DataForFilterService } from './interfacesAndServices/data-for-filter.service';
import { IFilters } from './interfacesAndServices/filters';
import { ReservationServiceService } from './interfacesAndServices/reservation-service.service';
import { DataService } from './interfacesAndServices/data.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'project';
  activeCurrency:string;
  plnEvent:string = "auto";
  euroEvent:string = "auto";
  dolarEvent:string = "auto";
  loginToken:[boolean, string];
  login:string = "";
  type:string = "";

  constructor(public datepipe: DatePipe, private dataService:DataService){
    this.loginToken = this.dataService.logT;
    this.setLogin();
    this.dataService.loginToken$.subscribe((data) => {
        console.log(data);
        this.loginToken = data;
        this.setLogin();
      }
    ); 
  }

  setLogin(){
    this.login = "";
    this.type = "";
    if(this.loginToken[0]){
      Object.entries(jwt_decode(this.loginToken[1])!).forEach(
        ([key, value]) => {
          if(key == "user_id"){
            this.login = value;
            
          }

          if(key == "user_type"){
            this.type = value;
          }
        }
      );
    }
  }
  
  ngOnInit():void{
    this.activeCurrency = this.dataService.getCurrency();
    this.plnEvent = this.activeCurrency != "PLN"?"auto":"none";
    this.dolarEvent = this.activeCurrency != "USD"?"auto":"none";
    this.euroEvent = this.activeCurrency != "EUR"?"auto":"none";
  }

  changeCurrency(currency:string){
    this.activeCurrency = currency;
    this.plnEvent = this.activeCurrency != "PLN"?"auto":"none";
    this.dolarEvent = this.activeCurrency != "USD"?"auto":"none";
    this.euroEvent = this.activeCurrency != "EUR"?"auto":"none";
    this.dataService.changeCurrency(currency);
  }

}

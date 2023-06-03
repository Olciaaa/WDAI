import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../interfacesAndServices/data.service';

@Component({
  selector: 'app-trip-price',
  templateUrl: './trip-price.component.html',
  styleUrls: ['./trip-price.component.scss']
})
export class TripPriceComponent implements OnInit{
  activeCurrency:string;
  plnEvent:string = "auto";
  euroEvent:string = "auto";
  dolarEvent:string = "auto";

  constructor(private dataService:DataService){

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

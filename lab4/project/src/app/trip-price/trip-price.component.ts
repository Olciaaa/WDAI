import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-trip-price',
  templateUrl: './trip-price.component.html',
  styleUrls: ['./trip-price.component.scss']
})
export class TripPriceComponent implements OnInit{
  @Input() priceInUSD:number;
  @Input() color:string;
  activePrice:number;
  activeCurrency:string;
  plnEvent:string = "auto";
  euroEvent:string = "auto";
  dolarEvent:string = "auto";
  rates:{[key:string]:number} = {
    "USD":1,
    "PLN":3.88,
    "EUR":0.9
  }

  ngOnInit():void{
    this.activeCurrency = "USD";
    this.activePrice = this.priceInUSD;
    this.dolarEvent = "none";
  }

  ngOnChanges(){
    this.activePrice = this.priceInUSD;
    this.changeCurrency(this.activeCurrency);
  }

  changeCurrency(currency:string){
    this.activeCurrency = currency;
    this.plnEvent = this.activeCurrency != "PLN"?"auto":"none";
    this.dolarEvent = this.activeCurrency != "USD"?"auto":"none";
    this.euroEvent = this.activeCurrency != "EUR"?"auto":"none";
    this.activePrice = this.priceInUSD * this.rates[currency];
  }
}

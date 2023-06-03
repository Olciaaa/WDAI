import { Component, Input, OnInit } from '@angular/core';
import { ITrip } from '../interfacesAndServices/trip';
import { DatePipe } from '@angular/common';
import { TripsListComponent } from '../trips-list/trips-list.component';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';
import { DataService } from '../interfacesAndServices/data.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit{
  @Input() trip:ITrip;
  @Input() borderColor:string;
  startDate:any;
  endDate:any;
  picture:string = "assets/pictures/California.jpg";
  activeFilter:string;
  currentAvailableMembers:number;
  color:string = "black";
  tripRates:number[] = [];
  price:number;
  currency:string;

  constructor(public datepipe: DatePipe, private resService: ReservationServiceService, private dataService:DataService){
    this.dataService.currency$.subscribe((data)=>{
      this.currency = data;
      this.price = this.dataService.changePrice(this.trip.price);
    })
  }

  ngOnInit(): void {
    this.startDate = this.datepipe.transform(this.trip.startDate, 'dd/MM/yyyy')
    this.endDate = this.datepipe.transform(this.trip.endDate, 'dd/MM/yyyy')

    this.currentAvailableMembers = this.resService.getReserved()[this.trip.name][2] - this.resService.getReserved()[this.trip.name][0];

    this.changeStyle()

    this.currency = this.dataService.getCurrency();
    this.price = this.dataService.changePrice(this.trip.price);
  }

  changeMembers(members:number){
    this.currentAvailableMembers = members;
    this.changeStyle()
  }
  
  changeStyle():void{
    this.activeFilter = this.currentAvailableMembers == 0?"grayscale(100%)":"grayscale(0)";
    this.color = this.currentAvailableMembers <= 3?"rgb(255, 49, 84)":"black";
  }

  deleteTrip():void{
    this.dataService.delete(this.trip.id);
  }
}

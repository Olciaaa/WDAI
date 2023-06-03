import { Component, Input, OnInit } from '@angular/core';
import { ITrip } from '../interfacesAndServices/trip';
import { DatePipe } from '@angular/common';
import { TripsListComponent } from '../trips-list/trips-list.component';

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

  constructor(public datepipe: DatePipe, private tripList: TripsListComponent){

  }

  ngOnInit(): void {
    this.startDate = this.datepipe.transform(this.trip.startDate, 'dd/MM/yyyy')
    this.endDate = this.datepipe.transform(this.trip.endDate, 'dd/MM/yyyy')

    this.currentAvailableMembers = this.trip.maxParticipants;

    this.changeStyle()
  }

  changeMembers(members:number){
    this.currentAvailableMembers = members;
    this.changeStyle()
  }
  
  changeStyle():void{
    this.activeFilter = this.currentAvailableMembers == 0?"grayscale(100%)":"grayscale(0)";
    this.color = this.currentAvailableMembers <= 3?"rgb(255, 49, 84)":"black";
  }

  newTripRate(rate:number){
    this.tripRates.push(rate);
    const sum = this.tripRates.reduce((a, b) => a + b, 0);
    const avg = (sum / this.tripRates.length) || 0;
    this.trip.grade = Math.round((avg + Number.EPSILON) * 100) / 100
  }

  deleteTrip():void{
    this.tripList.removeTrip(this.trip.id);
  }
}

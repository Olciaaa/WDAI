import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';

@Component({
  selector: 'app-trip-buttons',
  templateUrl: './trip-buttons.component.html',
  styleUrls: ['./trip-buttons.component.scss']
})
export class TripButtonsComponent implements OnInit{
  membersAvailable:number;
  @Input() nameOfTrip:string;
  currentMembers:number;
  @Output() members = new EventEmitter<number>();
  pointerEventsAdd:string = "auto";
  pointerEventsRemove:string = "auto";
  activeRemove:string;
  activeAdd:string;
  reserved:{[index:string]:number[]} = {};

  constructor(private reservationService:ReservationServiceService){

  }

  ngOnInit(): void {
    this.currentMembers = this.reservationService.getReserved()[this.nameOfTrip][2] - this.reservationService.getReserved()[this.nameOfTrip][0];
    this.membersAvailable = this.reservationService.getReserved()[this.nameOfTrip][2];
    console.log(this.membersAvailable);
    this.updateMembers();
  }

  addTrip():void{
    this.currentMembers -= 1;
    
    this.updateMembers();
    this.reservationService.reserveTrip(this.nameOfTrip);
  }

  removeTrip():void{
    this.currentMembers +=1;
    
    this.updateMembers();
    this.reservationService.unreserveTrip(this.nameOfTrip);
  }

  //to wszystko muszę wywalić do serwisu, tam będzie sprawdzane wszystko, np zrobić "isAddActive" i tam return !(data[0] == data[2])
  updateMembers():void{
    this.pointerEventsRemove = this.currentMembers == this.membersAvailable?"none":"auto";
    this.pointerEventsAdd = this.currentMembers == 0?"none":"auto";
    this.activeRemove = this.currentMembers == this.membersAvailable?"none":"block";
    this.activeAdd = this.currentMembers == 0?"none":"block";
    this.members.emit(this.currentMembers);
  }
}

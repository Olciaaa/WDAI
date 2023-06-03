import { Component, Input, OnInit } from '@angular/core';
import { ITrip } from '../interfacesAndServices/trip';
import { DatePipe } from '@angular/common';
import { TripsListComponent } from '../trips-list/trips-list.component';
import { ReservationServiceService } from '../interfacesAndServices/reservation-service.service';
import { DataService } from '../interfacesAndServices/data.service';
import jwt_decode from "jwt-decode";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  loginToken:[boolean, string];
  type:string;

  editMode:boolean = false;
  modelForm : FormGroup;
  dateFine:boolean = true;

  constructor(public datepipe: DatePipe, private resService: ReservationServiceService, private dataService:DataService, private formBuilder : FormBuilder){
    this.dataService.currency$.subscribe((data)=>{
      this.currency = data;
      this.price = this.dataService.changePrice(this.trip.price);
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

  ngOnInit(): void {
    this.startDate = this.datepipe.transform(this.trip.startDate, 'dd/MM/yyyy')
    this.endDate = this.datepipe.transform(this.trip.endDate, 'dd/MM/yyyy')

    this.currentAvailableMembers = this.resService.getReserved()[this.trip.name][2] - this.resService.getReserved()[this.trip.name][0];

    this.changeStyle()

    this.currency = this.dataService.getCurrency();
    this.price = this.dataService.changePrice(this.trip.price);

    this.modelForm = this.formBuilder.group({
      name: ['',[]],
      place: ['',[]], 
      startDate:['',[]],
      endDate:['',[]],
      price:['', []],
      maxParticipants:['', []],
      picture:['', []],
      description:['', []]
    });
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

  editTrip():void{
    this.editMode = !this.editMode;
  }

  onSubmit(form:any) {
    console.log("submit")
    let data:ITrip = {
      id:this.trip.id,
      name:form.value.name == ''?this.trip.name:form.value.name,
      place:form.value.place == ''?this.trip.place:form.value.place,
      startDate:form.value.startDate == ''?this.trip.startDate:new Date(form.value.startDate),
      endDate:form.value.endDate == ''?this.trip.endDate:new Date(form.value.endDate),
      price:form.value.price == ''?this.trip.price:Number(form.value.price),
      maxParticipants: form.value.maxParticipants == ''?this.trip.maxParticipants:Number(form.value.maxParticipants),
      picture: form.value.picture == ''?this.trip.picture:form.value.picture,
      description: form.value.description == ''? this.trip.description:form.value.description,
      grade: this.trip.grade
    }
    console.log(data)

    if(data.startDate > data.endDate){
      this.dateFine = false;
    }
    else{
      this.dateFine = true;
      this.dataService.editTrip(data);
    }
  }
}

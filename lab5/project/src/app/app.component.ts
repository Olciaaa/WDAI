import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import data from 'src/assets/data.json'
import { ITrip } from './interfacesAndServices/trip';
import { DatePipe } from '@angular/common';
import { DataForFilterService } from './interfacesAndServices/data-for-filter.service';
import { IFilters } from './interfacesAndServices/filters';
import { ReservationServiceService } from './interfacesAndServices/reservation-service.service';
import { DataService } from './interfacesAndServices/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'project';

  constructor(public datepipe: DatePipe, private list:DataForFilterService, private reservationService:ReservationServiceService, private dataService:DataService){
  }
  
  ngOnInit():void{
    
  }

}

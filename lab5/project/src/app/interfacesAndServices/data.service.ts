import { Injectable } from '@angular/core';
import { catchError, max, Observable, Subject } from 'rxjs';
import { ITrip } from './trip';
import data from 'src/assets/data.json'
import { DataForFilterService } from './data-for-filter.service';
import { ReservationServiceService } from './reservation-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data$: Observable<any>;
  private dataSubject = new Subject<any>();
  currency$: Observable<string>
  private currencySubject = new Subject<any>();

  trips:ITrip[] = [];
  id:number;
  currency:string;
  rates:{[key:string]:number} = {
    "USD":1,
    "PLN":3.88,
    "EUR":0.9
  }
  revievs:{[id:number]:[{grade:number}]} = {}

  URL:string = "http://localhost:4000";

  constructor(private filterService: DataForFilterService, private reservationService:ReservationServiceService, private http: HttpClient) { 
    this.data$ = this.dataSubject.asObservable();
    this.currency$ = this.currencySubject.asObservable();
    this.createData();
    this.id = this.trips.length;
    this.currency = "USD";
  }

  getDataFromServer(): Observable<any[]>{
    return this.http.get<JSON[]>(this.URL + "/trips")
  }

  async createData(){
    let i = 0;
    await this.getDataFromServer().subscribe((data) => {
      for (const trip of data) {
        this.trips.push({
          id:trip.id,
          name:trip.name,
          place:trip.place,
          startDate:new Date(trip.startDate),
          endDate:new Date(trip.endDate),
          price:Number(trip.price),
          maxParticipants: Number(trip.maxParticipants),
          picture: trip.picture,
          description: trip.description,
          grade: 0
        })
        i++;
      }
      this.dataSubject.next(this.trips);
      this.filterService.createListForFilter(this.trips);
      this.reservationService.generateNamesList(this.trips);
    })    
  }

  delete(id:number){
    this.reservationService.removePlace(this.trips.find(element => element.id == id)?.name);
    this.trips = this.trips.filter(obj => obj.id !== id);
    this.dataSubject.next(this.trips);
    if(this.trips.length > 0){this.filterService.createListForFilter(this.trips)}
    return this.http.delete(this.URL + "/trips/" + id, httpOptions).subscribe(() => console.log("user deleted"));
  }

  getData():ITrip[]{
    return this.trips;
  }

  async addTrip(newTrip:ITrip){
    let id = 0;
    this.http.post<ITrip>(this.URL + "/trips", JSON.stringify(newTrip), httpOptions).subscribe(() => 
    this.getDataFromServer().subscribe((data) => {
      for (const trip of data) {
        if(id < trip.id){
          id = trip.id;
        }
      }

      newTrip.id = id;
      this.trips.push(newTrip);
      this.dataSubject.next(this.trips);
      this.filterService.createListForFilter(this.trips);
      this.reservationService.addPlace(newTrip);
    }));
  }

  changeCurrency(newCurrency:string){
    this.currency = newCurrency;
    this.currencySubject.next(this.currency);
    console.log(this.currency);
  }

  getCurrency():string{
    return this.currency;
  }

  changePrice(price:number){
    return price * this.rates[this.currency];
  }

  rateTrip(id:number, rate:number){
    let numberOfRevievs = 1;

    if(id in this.revievs){
      this.revievs[id].push({grade:rate})
      numberOfRevievs = this.revievs[id].length;
    }
    else{
      this.revievs[id] = [{grade:rate}];
    }

    let grade = this.revievs[id].reduce((accumulator, object) => {
      return accumulator + object.grade;
    }, 0);

    const sum = grade;
    const avg = (sum / numberOfRevievs);
    this.trips[this.trips.findIndex(el => el.id == id)].grade = Math.round((avg + Number.EPSILON) * 100) / 100;
    this.dataSubject.next(this.trips);
  }

  buyTrip(name:string, number:number){
    let id:number = this.trips.findIndex(el => el.name == name)
    this.trips[id].maxParticipants = this.trips[id].maxParticipants - number;
    this.dataSubject.next(this.trips);
  }
}

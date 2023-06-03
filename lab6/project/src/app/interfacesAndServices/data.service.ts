import { Injectable } from '@angular/core';
import { catchError, max, Observable, Subject } from 'rxjs';
import { ITrip } from './trip';
import data from 'src/assets/data.json'
import { DataForFilterService } from './data-for-filter.service';
import { ReservationServiceService } from './reservation-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  })
};

interface user {
  login: string;
  password: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data$: Observable<any>;
  private dataSubject = new Subject<any>();
  currency$: Observable<string>
  private currencySubject = new Subject<any>();
  loginToken$: Observable<[boolean, string]>
  private loginToken = new Subject<[boolean, string]>();
  public logT:[boolean, string];

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

  constructor(private filterService: DataForFilterService, private reservationService:ReservationServiceService, private http: HttpClient, private cookieService: CookieService) { 
    this.data$ = this.dataSubject.asObservable();
    this.currency$ = this.currencySubject.asObservable();
    this.loginToken$ = this.loginToken.asObservable();
    this.createData();
    this.id = this.trips.length;
    this.currency = "USD";

    let login:[boolean, string] = [false, ""]
    //console.log(this.cookieService.check('loginToken'))
    if(this.cookieService.check('loginToken')){
       login = [true, this.cookieService.get('loginToken')];
    }
    console.log(login)
    this.logT = login;
    this.loginToken.next(login);
    
  }

  getDataFromServer(): Observable<any[]>{
    return this.http.get<JSON[]>(this.URL + "/trips")
  }

  async createData(){
    this.trips = []
    await this.getDataFromServer().subscribe((data) => {
      //console.log(data);
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
          grade: trip.grade
        })
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
    return this.http.delete(this.URL + "/trips/" + id, httpOptions).subscribe(() => console.log("trip deleted"));
  }

  getData():ITrip[]{
    //console.log(this.trips)
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

  async editTrip(newTrip:ITrip){
    this.http.post<ITrip>(this.URL + "/tripEdit", JSON.stringify(newTrip), httpOptions).subscribe(() => 
    this.getDataFromServer().subscribe((data) => {
      this.createData();
    }));  
  }

  changeCurrency(newCurrency:string){
    this.currency = newCurrency;
    this.currencySubject.next(this.currency);
    //console.log(this.currency);
  }

  getCurrency():string{
    return this.currency;
  }

  changePrice(price:number){
    return price * this.rates[this.currency];
  }

  getGradeFromServer(id:number): Observable<any[]>{
    return this.http.get<JSON[]>(this.URL + "/grades/" + id)
  }

  rateTrip(id:number, rate:number){
    this.http.post(this.URL + "/grades/" + id + "/" + rate, httpOptions).subscribe(() => 
      this.getGradeFromServer(id).subscribe((data) => {
        for (const grade of data) {
          this.trips[this.trips.findIndex(el => el.id == id)].grade = grade.grade;
          this.dataSubject.next(this.trips);
        }
      })
    );
  }

  buyTrip(name:string, num:number){
    let id:number = this.trips.findIndex(el => el.name == name)
    this.trips[id].maxParticipants = this.trips[id].maxParticipants - num;
    this.dataSubject.next(this.trips);
    this.http.post(this.URL + "/trips/" + this.trips[id].id + "/" + num, httpOptions).subscribe(() => console.log("trip bought"));
    let idUser:string = "";
    if(this.logT[0]){
      Object.entries(jwt_decode(this.logT[1])!).forEach(
        ([key, value]) => {
          if(key == "user_id"){
            idUser = value;
          }
        }
      );
    }
    //console.log(idUser);
    this.http.post(this.URL + "/buy/" + idUser + "/" + this.trips[id].id + "/" + num, httpOptions).subscribe(() => console.log("trip bought"));
  }

  async addUser(user:user):Promise<boolean>{
    //console.log(user);
    let isUser = await this.nicknameExists(user);
    if(isUser){
      return false;
    }
    this.http.post(this.URL + "/users/" + user.login + "/" + user.password + "/" + user.type, httpOptions).subscribe(() => console.log("user added"));
    return true;
  }

  userExists(user:user){
    return new Promise((resolve, reject) =>{
      this.http.post(this.URL + "/userCheck/" + user.login + "/" + user.password, httpOptions).subscribe((data:any) => {
        resolve(data[0].isUser == 1?true:false);
      });
    }) 
  }

  nicknameExists(user:user){
    return new Promise((resolve, reject) =>{
      this.http.post(this.URL + "/nicknameCheck/" + user.login, httpOptions).subscribe((data:any) => {
        resolve(data[0].isUser == 1?true:false);
      });
    }) 
  }

  login(user:user){
    this.http.post(this.URL + "/login/" + user.login + "/" + user.password, httpOptions).subscribe((token:any) => {
      console.log(token);
      //console.log(decoded);
      this.cookieService.set('loginToken', token);
      this.loginToken.next([true, token]);
      this.logT = [true, token]
    });
  }

  logout(){
    this.cookieService.delete('loginToken');
    //console.log(this.loginToken);
    this.loginToken.next([false, '']);
    this.logT = [false, ''];
  }

  getUsers(){
    return new Promise((resolve, reject) =>{
      this.http.get(this.URL + "/users", httpOptions).subscribe((data:any) => 
        {
          resolve(data);
        }
      );
    }) 
  }

  changeAccountType(id: number, type: string){
    this.http.post(this.URL + "/type/" + id + "/" + type, httpOptions).subscribe(() => console.log("user changed"));
  }

  userBanChange(id:number, ban: number){
    this.http.post(this.URL + "/ban/" + id + "/" + ban, httpOptions).subscribe(() => console.log("user changed"));
  }

  getBoughtData(){
    let idUser:string = "";
    if(this.logT[0]){
      Object.entries(jwt_decode(this.logT[1])!).forEach(
        ([key, value]) => {
          if(key == "user_id"){
            idUser = value;
          }
        }
      );
    }

    return new Promise((resolve, reject) =>{
      this.http.get(this.URL + "/buy/" + idUser, httpOptions).subscribe((data:any) => {
        console.log(data)
        resolve(data);
      });
    }) 
  }
}

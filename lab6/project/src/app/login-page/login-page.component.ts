import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../interfacesAndServices/data.service';
import jwt_decode from "jwt-decode";
interface user {
  login: string;
  password: string;
  type: string;
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  authentication: user[] = [];
  errorArray: any[] = [];
  loginToken:[boolean, string];
  loginData:any = {};

  addAuth = new FormGroup({
    login: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private dataService:DataService){
    this.loginToken = this.dataService.logT;
    this.setLoginData();
    this.dataService.loginToken$.subscribe((data) => {
        console.log(data);
        this.loginToken = data;
        this.setLoginData();
      }
    ); 
  }

  setLoginData(){
    this.loginData = {};
    if(this.loginToken[0]){
      Object.entries(jwt_decode(this.loginToken[1])!).forEach(
        ([key, value]) => {
          this.loginData[key] = value;
        }
      );
    }
    console.log(this.loginData);
  }

  async submitForm() {
    let newAuth = ({
      login: this.addAuth.get('login')!.value,
      password: this.addAuth.get('password')!.value,
      type: "client"
    } as user);
    let isUser = await this.dataService.userExists(newAuth);
    if(isUser){
      alert("Welcome back " + newAuth.login + "!");
      await this.dataService.login(newAuth);
    }
    else{
      alert("Wrong login or password!")
    }
    this.addAuth.reset();
  }

  logOut(){
    this.dataService.logout();
  }

  ngOnInit(): void {}
}

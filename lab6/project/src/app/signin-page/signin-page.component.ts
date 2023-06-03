import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DataService } from '../interfacesAndServices/data.service';
interface login {
  login: string;
  password: string;
  type: string;
}
@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {
  authentication: login[] = [];
  errorArray: any[] = [];

  constructor(private dataService:DataService){

  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('password2')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  addAuth = new FormGroup({
    login: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    password2: new FormControl('', [
      Validators.required
    ])
  }, { validators: this.checkPasswords });

  submitForm() {
    let newAuth = ({
      login: this.addAuth.get('login')!.value,
      password: this.addAuth.get('password')!.value,
      type:"client"
    } as login);
    console.log(newAuth);
    this.dataService.addUser(newAuth).then(function(result) {
      if(result){
        alert("Welcome " + newAuth.login + "!");
      }
      else{
        alert("User already exists!")
      }
    });
    this.addAuth.reset();
  }

  ngOnInit(): void {}
}

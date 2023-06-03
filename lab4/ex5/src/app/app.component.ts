import { Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import { ICar } from './interfaces/Car';
import { IData } from './interfaces/Data';
import * as data from './assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(){

  }
  showCar:boolean = false;
  car:ICar;

  selectedBrand: string;
  selectedType: string;
  selectedColor: string;

  cars:ICar[] = [];
  showBrands:boolean = true;
  showTypes:boolean = false;
  showColors:boolean = false;
  data:any = data;

  colors: string[];

  ngOnInit():void{
    let temp:any = {}
    for (const [key, value] of Object.entries(this.data)) {
      if(key != "default"){
        temp[key] = value
      }
      this.data = temp
    }
  }

  addCar() {
    this.cars = [];
    this.cars.push({
      brand: this.selectedBrand,
      type: this.selectedType,
      color: this.selectedColor
    });
  }

  chosenBrand() {
    this.showTypes = true;
  }
  chosenType() {
    this.showColors = true;
  }
  chosenColor(color:any){
    this.selectedColor = String(color);
    //this.addCar();
    this.car = {
      brand: this.selectedBrand,
      type: this.selectedType,
      color: this.selectedColor
    }
    this.showCar = true;
  }
}

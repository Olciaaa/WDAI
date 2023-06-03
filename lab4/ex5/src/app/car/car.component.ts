import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent{
  @Input() brand:String = "";
  @Input() color:String = "";
  @Input() type: String = ""
  constructor(){

  }

  ngOnInit():void{

  }
}

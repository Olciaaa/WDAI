import { Component, ElementRef, ViewChild } from '@angular/core';
import {ITopic} from './interfaces/Topic';
import json from "./data.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ex6';
  constructor(){
  }

  @ViewChild('moreInfo')div:ElementRef<HTMLDivElement>;

  data:ITopic[] = json;
  info:ITopic;
  showInfo:boolean = false;

  ngAfterViewInit() {
  }

  changeContent(id:number){
    this.info = this.data[id];
    this.showInfo = true;
  }
}

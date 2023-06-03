import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit{
  @Input() title:string;
  @Input() text:string;
  @Input() id:number;

  @Output() newItemEvent = new EventEmitter<number>();
  
  constructor(){

  }

  ngOnInit() {
    
  }

  clickElement(){
    this.newItemEvent.emit(this.id);
  }
  
}

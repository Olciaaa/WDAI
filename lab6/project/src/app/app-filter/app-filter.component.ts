import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { DataForFilterService } from '../interfacesAndServices/data-for-filter.service';
import { IFilters } from '../interfacesAndServices/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './app-filter.component.html',
  styleUrls: ['./app-filter.component.scss']
})
export class AppFilterComponent {
  public data: Array<any>;
  filters:IFilters = {
    placeRange:["any"],
    startDate:[new Date(), new Date()],
    endDate:[new Date(), new Date()],
    price:[0, 0],
    grade: [0, 1, 2, 3, 4, 5]
  };
  readyFilters:IFilters;
  ready:boolean = false;

  public constructor(private myService: DataForFilterService, private elem: ElementRef) {
    this.myService.myMethod$.subscribe((data) => {
      (async () => {
        this.data = await this.myService.getMyMethod();
        this.prepareFilters(this.data);
      })();
      }
    ); 
  }

  ngOnInit(){
    (async () => {
      this.data = await this.myService.getMyMethod();
      console.log(this.data);
      this.prepareFilters(this.data);
    })();
  }

  prepareFilters(data:any){
    console.log(data)
    if(typeof data == 'undefined'){
      return;
    }
    this.ready = true;
    this.filters = data;
    this.filters.placeRange = this.filters.placeRange.filter((element, index) => {
      return this.filters.placeRange.indexOf(element) === index;
    })
    this.readyFilters = JSON.parse(JSON.stringify(data));
    this.myService.filters(this.readyFilters);
  }

  checkAll(event:any){
    let inputs:any[] = this.elem.nativeElement.querySelectorAll('.places');
    for (const iterator of inputs) {
      iterator.checked = event.currentTarget.checked;
    }
    
    this.readyFilters.placeRange = event.currentTarget.checked?JSON.parse(JSON.stringify(this.filters.placeRange)):[];
    this.filter();
  }

  placeAdd(place:string, event:any){
    if(event.currentTarget.checked){
      this.readyFilters.placeRange.push(place);
    }
    else{
      const index = this.readyFilters.placeRange.indexOf(place);
      if (index > -1) {
        this.readyFilters.placeRange.splice(index, 1); 
      }
    }
    
    this.filter();
  }

  gradeAdd(grade:number, event:any){
    if(event.currentTarget.checked){
      this.readyFilters.grade.push(grade);
    }
    else{
      const index = this.readyFilters.grade.indexOf(grade);
      if (index > -1) {
        this.readyFilters.grade.splice(index, 1); 
      }
    }

    this.filter();
  }

  filter(){
    this.myService.filters(this.readyFilters);
  }  
}

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
  filters:IFilters;
  readyFilters:IFilters;

  public constructor(private myService: DataForFilterService, private elem: ElementRef) {
    this.myService.myMethod$.subscribe((data) => {
        this.data = data;
        this.prepareFilters(this.data);
      }
    ); 
  }

  prepareFilters(data:any){
    this.filters = data;
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

import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { DataForFilterService } from '../interfacesAndServices/data-for-filter.service';
import { FilterPipePipe } from '../interfacesAndServices/filter-pipe.pipe';
import { IFilters } from '../interfacesAndServices/filters';
import { ITrip } from '../interfacesAndServices/trip';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnChanges{
  @Input() trips:ITrip[];
  @Input() currentId:number;
  @Output() idToRemove = new EventEmitter<number>;
  color:{[key:number]:string} = {};
  minPrice:number;
  maxPrice:number;
  filters:IFilters;

  constructor(private myService:DataForFilterService){
    this.myService.filter$.subscribe((data) => {
      this.filters = data;
      console.log(this.filters)
    }
  ); 
  }

  ngOnChanges():void{
    this.findPricesMinMax();
  }

  findPricesMinMax():void{
    if(this.trips.length > 0){
      let tym = this.trips.map(x => ({"id":x.id, "price":x.price}));
      tym.sort((a, b) => a.price - b.price);
      this.minPrice = tym[0].price;
      this.maxPrice = tym[tym.length - 1].price;
      this.setBorderColors();
    }
  }

  setBorderColors():void{
    this.color = {};
    for (const el of this.trips) {
      if(el.price == this.minPrice){
        this.color[el.id] = "green";
      }
      else if(el.price == this.maxPrice){
        this.color[el.id] = "red";
      }
      else{
        this.color[el.id] = "pink";
      }
    }
    console.log(this.color)
  }

  removeTrip(id:number):void{
    this.idToRemove.emit(id);
  }
}

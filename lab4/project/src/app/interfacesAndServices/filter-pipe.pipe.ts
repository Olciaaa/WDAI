import { Pipe, PipeTransform } from '@angular/core';
import { IFilters } from './filters';
import { ITrip } from './trip';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any[], filter: IFilters): ITrip[] {
    let filteredTrips:ITrip[] = [];
    let placesAvailable = filter.placeRange.map(function(v) {
      return v.toLowerCase();
    });
    for(let trip of value){
      let flag = true;
      if(!(trip["price"] >= filter["price"][0] && trip["price"] <= filter["price"][1])){
        flag = false;
      }

      if(!(trip["startDate"] >= new Date(filter["startDate"][0]))){
        flag = false;
      }

      if(!(trip["endDate"] <= new Date(filter["endDate"][1]))){
        flag = false;
      }

      if(!(filter.grade.includes(Math.round(trip["grade"])))){
        flag = false;
      }

      if(!(placesAvailable.includes(trip["place"].toLowerCase()))){
        flag = false;
      }

      if(flag){filteredTrips.push(trip)}
    }
    return filteredTrips;
  }

}

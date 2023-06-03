import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter',
  pure: false
})
export class StatusFilterPipe implements PipeTransform {

  transform(value: any[], filter: boolean[]): any {
    console.log(filter)
    if(typeof filter == 'undefined'){
      return value;
    }
    let filteredTrips:any[] = [];

    for(let el of value){
      let id:number = 0;
      if(el.value[9] == "waiting"){
        id = 1
      }
      else if(el.value[9] == "ended"){
        id = 2
      }
      if(filter[id]){
        filteredTrips.push(el);
      }
    }
    return filteredTrips;
  }

}

import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITrip } from '../interfacesAndServices/trip';
import { TripsListComponent } from '../trips-list/trips-list.component';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent {
  modelForm : FormGroup;
  @Input() currentId:number;
  dateFine:boolean = true;
  @Output() newTrip = new EventEmitter<ITrip>();

  constructor(private formBuilder : FormBuilder) {
  }
  
  ngOnInit() {
    this.modelForm = this.formBuilder.group({
     name: ['',[Validators.required]],
     place: ['',[Validators.required]], 
     startDate:['', Validators.required],
     endDate:['', Validators.required],
     price:['', Validators.required],
     maxParticipants:['', Validators.required],
     picture:['', Validators.required],
     description:['', Validators.required]
   });
   
   this.modelForm.valueChanges.subscribe((value:any) => {
    
   });
  }

  onSubmit(form:any) {
    let data:ITrip = {
      id:this.currentId,
      name:form.value.name,
      place:form.value.place,
      startDate:new Date(form.value.startDate),
      endDate:new Date(form.value.endDate),
      price:Number(form.value.price),
      maxParticipants: Number(form.value.maxParticipants),
      picture: form.value.picture,
      description: form.value.description,
      grade: 0
    }

    if(data.startDate > data.endDate){
      this.dateFine = false;
    }
    else{
      this.dateFine = true;
      this.newTrip.emit(data);
    }
  }
}

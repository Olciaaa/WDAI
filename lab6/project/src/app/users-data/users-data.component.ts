import { Component } from '@angular/core';
import { DataService } from '../interfacesAndServices/data.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent {
  users:any;

  constructor(private dataService:DataService){
    
  }

  async ngOnInit(){
    this.users = await this.dataService.getUsers();
    console.log(this.users)
  }

  changeType(type:string, id:number){
    console.log(type + " " + id)
    this.users.find((element:any) => element.id == id).accountType = type;
    this.dataService.changeAccountType(id, type);
  }

  ban(id:number){
    this.users.find((element:any) => element.id == id).banned = 1;
    this.dataService.userBanChange(id, 1);
  }
  unban(id:number){
    this.users.find((element:any) => element.id == id).banned = 0;
    this.dataService.userBanChange(id, 0);
  }
}

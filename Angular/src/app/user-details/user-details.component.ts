import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() Email: string;
  @Input() id: string;
  
  constructor(private _user:UserService) { }

  ngOnInit(): void {
  }

  Delete()
  {
    this._user.delete(this.id)
    .subscribe(
      data=>{console.log(data); console.log("deleted")} ,
      error=>console.error(error)
    )
  }

}

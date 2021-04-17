import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  datas: {}

  
  constructor(private _user:UserService, private _router:Router) {
    this._user.users()
    .subscribe(
      data=> 
      {
        this.datas = data
        console.log(this.datas[0]._id)
      },
      error=>console.log(error)
    )
   }


  
  ngOnInit(): void {
  }

  logout()
  {
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }

}

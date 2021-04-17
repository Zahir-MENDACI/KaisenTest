import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required),
    cpassword:new FormControl(null,Validators.required)
  })
  
  constructor(private _user:UserService, private _router:Router) { }

  ngOnInit(): void {
    
  }

  etat: string = 'login'
  marginLeft: string = '0%'

  getStyle()
  {
    return this.marginLeft
  }

  loginTab()
  {
    if(this.etat === 'signup')
    {
      console.log(this.marginLeft)
      this.marginLeft = "0%"
      console.log(this.marginLeft)
    }
    this.etat='login'
  }
  signupTab()
  {
    if(this.etat === 'login')
    {
      console.log(this.marginLeft)
      this.marginLeft = "-50%"
      console.log(this.marginLeft)
    }
    this.etat='signup'
  }
  

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid');return;
    }

    console.log(JSON.stringify(this.loginForm.value))
    
    // console.log(JSON.stringify(this.loginForm.value));
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/user']);} ,
      error=>console.error(error)
    )
  }

  

  register(){
    console.log(JSON.stringify(this.registerForm.value))
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpassword.value)){
      console.log('Invalid Form'); return;
    }

    this._user.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data=> {console.log(data); console.log("signup success")},
      error=>console.error(error)
    )
  }

}

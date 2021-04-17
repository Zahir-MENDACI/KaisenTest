import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../userModel';

@Injectable()
export class UserService {

  constructor(private _http:HttpClient) { }

  
    register(body:any){
    return this._http.post('http://localhost:5500/user/signup',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

  login(body:any){
    return this._http.post('http://localhost:5500/user/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  delete(id){
    return this._http.delete('http://localhost:5500/user/'+id,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  users(){
    return this._http.get('http://localhost:5500/user/',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://localhost:5500/user/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

}

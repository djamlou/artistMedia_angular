import { Component, OnInit } from '@angular/core';
import {User} from './entities/user';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: 'Artist Media';
  private statemarque:number = 0;
  private _uservice:UserService; 
  private username:string;
  private password:string;
  private email:string;
  private user:User;

  constructor( p_uservice:UserService){

    this._uservice = p_uservice;
  
  }

  public loginForm(){

    let myDiv = document.getElementById('loginForm');
  
    if(this.statemarque==0){
  
        myDiv.style.display = "block";
        this.statemarque = 1;
    } else {
  
        myDiv.style.display ="none";
        this.statemarque = 0;
    }
  }
  
  public registerForm(){
  
    let myDiv = document.getElementById('registerForm');
  
    if(this.statemarque==0){
  
        myDiv.style.display = "block";
        this.statemarque = 1;
    } else {
  
        myDiv.style.display ="none";
        this.statemarque = 0;
    }
  }

  public onLogin(){
  
    this._uservice.login(this.username, this.password).then(
      (p_user: User) => { 
        this.user = p_user;
      }
  );
  
  let myDiv = document.getElementById('loginForm');
  myDiv.style.display ="none";
  }
 
  public onRegister(){
    this._uservice.register(this.username, this.password, this.email).then(
      (p_user: User) => { 
        this.user = p_user;
      }
  );

  let myDiv = document.getElementById('registerForm');
  myDiv.style.display ="none";
  }
  public ngOnInit():void{

  }
  }
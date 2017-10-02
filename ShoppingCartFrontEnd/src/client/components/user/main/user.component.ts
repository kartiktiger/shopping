import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {HttpServiceProvider} from '../../../services/httpprovider.service';
import {UserSession} from '../../../services/user.session';

@Component({
    selector:'user-app',
    template:`
    <h1> Users Home </h1>
    <div class='navbar navbar-default'>
    <div class='container'>
     <div class='navbar navbar-header'>
       <a routerLink='/user/home' class='navbar-brand'>Users Section</a>
     </div>

  <ul class='nav navbar-nav'>
   <li>
     <a routerLink ="/user/viewproducts" > View Products </a>
   </li>
   <li>
     <a [routerLink] ="['/user/showcart',{userid:userid}]" >Show My Cart</a>
   </li>
    <li>
     <a (click)="updateUser()" class='hand'>Update Profile</a>
   </li>
  </ul>

   </div>
   </div>   
   <router-outlet>
   </router-outlet>
    `,
    styles :[`.hand{
                  cursor:pointer; } `
            ]
})
export class UserComponent implements OnInit
{
    userid:string; 
    retrieveUserError:string;

    constructor(private _httpService : HttpServiceProvider,
                private _userSession : UserSession,
                private _router : Router)
    {
      this.userid = _userSession.userid;

    }
    
    ngOnInit()
    { 
      this._router.navigate(['/user/home']);      
    }

    updateUser()
    {
        this._httpService.requestForHttp(this._httpService.domain + "api/user/"+this._userSession.username,
                                         "GET", null , null).subscribe((user:any) => {
        console.log("Debug : " +JSON.stringify(user) );
 
        if(user == null && user == undefined  )
        {
            console.log("Error 1 : Something went wrong while getting users");
        }
        else
        {
            this._router.navigate([ 'user/updateuser', {user: JSON.stringify(user)} ]);
        }
      },
            (error: any) => {
                            console.log("Error 2 : Something went wrong while retrieving user");
                            this.retrieveUserError ='Something went wrong while retrieving user';  
                        }
        );
    }
}
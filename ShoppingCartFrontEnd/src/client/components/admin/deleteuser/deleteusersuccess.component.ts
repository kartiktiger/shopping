import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {HttpServiceProvider} from '../../../services/httpprovider.service';
import {UserSession} from '../../../services/user.session';


@Component({
    template:`
    <h3> User Delete Successful Page </h3>
    <H3 style="color:green">{{message}}
    <a (click)="onClick(username)" [class.a]=true>Go Back</a></H3>
    `,
    styles :[`.a{cursor:pointer;
                 color:red;}`]
})
export class DeleteUserSuccessComponent implements OnInit
{
    message : string;
    username : string;
    constructor(private _httpService : HttpServiceProvider,
                private _userSession : UserSession,
                private _router : Router,
                private _activatedRoute : ActivatedRoute)
    {  
     
      }
    
    ngOnInit()
    {
        this._activatedRoute.params.subscribe((params:Params)=>{
            let username = params['username'];
            this.message =" User with username : "+ username + ", deleted successfully";   
        });
    }   
    
    onClick(username:string)
    {
        this._router.navigate(['admin/delete']);
    }


}
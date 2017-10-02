import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {HttpServiceProvider} from '../../../services/httpprovider.service';
import {UserSession} from '../../../services/user.session';


@Component({
    template:`
    <h3> User Update Successful/Failure Page </h3>
        <hr>
        <H3 style="color:green">
            {{message}}
            <a (click)="onClick()" [class.a]=true>Go Back</a>
        </H3>
    `,
    styles :[`.a{cursor:pointer;
                 color:blue;}`]
})
export class UpdateUserSuccessComponent implements OnInit
{
    message : string;
    constructor(private _httpService : HttpServiceProvider,
                private _userSession : UserSession,
                private _router : Router,
                private _activatedRoute : ActivatedRoute)
    {  }
    
    ngOnInit()
    {
        this._activatedRoute.params.subscribe((params:Params)=>{
            let username = params['username'];
            this.message =" User with username : "+ username + ", updated successfully";    
        });
    }   
    
    onClick()
    {
        if(this._userSession.userrole=='admin')
            {
                this._router.navigate(['admin/update']);
            }
        else
          {
                this._router.navigate(['user/home']);
          }
    }
}
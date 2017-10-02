import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {HttpServiceProvider} from '../../../services/httpprovider.service';
import {UserSession} from '../../../services/user.session';


@Component({
    template:`
    <div class="container" >
        <h1 class = 'element-center'> {{page}} </h1>
        <div class="table-responsive">
            <table class='table table-hover table-bordered element-center'>
                <tr>
                    <th>username</th>
                    <th>name</th>
                    <th>age</th>
                    <th>phone</th>
                    <th>role</th>
                    <th *ngIf="isRouteUpdateUser">update user</th>
                    <th *ngIf="isRouteDeleteUser">delete user</th>
                </tr>
                <tr *ngFor ="let user of users">
                    <td>{{user.username}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.age}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.role}}</td>
                    <td *ngIf="isRouteUpdateUser" (click)="onClick(user,'admin/updateuser')" [class.click]=true >update </td>
                    <td *ngIf="isRouteDeleteUser" (click) = "onClick(user,'admin/deleteuser')" [class.click]=true >delete </td>
                </tr>
            </table>
        </div>
    </div>
    `,
    styles :[`.click { 
                       cursor:pointer; color: blue;
                     }
               th { 
                    background-color: #225588;  color: white;
                  } `    
            ]
})
export class ViewUsersComponent implements OnInit
{
    users:any[];
    isRouteUpdateUser: boolean;
    isRouteDeleteUser: boolean;
    viewError : string;
   
    page: string;

    constructor(private _httpService : HttpServiceProvider,
                private _userSession : UserSession,
                private _router : Router, private activatedRoute: ActivatedRoute)
    {    
        console.log("path : " + activatedRoute.snapshot.url[0].path); 
        if('update' === activatedRoute.snapshot.url[0].path)
        { 
            this.isRouteUpdateUser = true; this.page = 'Update Users';
        }
        else if('delete' === activatedRoute.snapshot.url[0].path)
        { 
            this.isRouteDeleteUser = true; this.page = 'Delete Users';
        }
        else if('view' === activatedRoute.snapshot.url[0].path){
            this.page = 'View Users ';   }
}


    ngOnInit()
    {
        this._httpService.requestForHttp(this._httpService.domain + "api/all/users","GET", null , null).subscribe((data:any) => {
        console.log("Debug : " +JSON.stringify(data) );
 
        if(data == null && data == undefined  )
        {
            console.log("Error 1 : Something went wrong while getting users");
        }
        else
        {
            this.users = data;
        
            this.users.forEach( user => {
                console.log("user : "+ user.username +":"+this._userSession.getUsername() );

                if(this._userSession.getUsername() == user.username)
                {   
                    this.users.splice(this.users.indexOf(user),1)
                }
            },
            (error: any) => {
                            console.log("Error 2 : Something went wrong while getting users");
                            this.viewError ='Something went wrong while getting users';  
                        }
            );
          }
        });
    }


    onClick(user: any, routepath: string)
    {
        console.log("user : " +JSON.stringify(user));
         this._router.navigate([ routepath,
	    { id: user._id, user: JSON.stringify(user) }
	  ]);
    }


}
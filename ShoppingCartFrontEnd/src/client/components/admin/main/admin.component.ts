import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector:'admin-app',
    template:`
    <h1> Welcome Admin </h1>
    <div class='navbar navbar-default'>
     <div class='container'>
      <div class='navbar navbar-header'>
       <a href='/admin/home' class='navbar-brand'>Admin's Section</a>
      </div>

   <ul class='nav navbar-nav'>
   <li>
    <a routerLink ="/admin/view" > View Users </a>
   </li>
   <li>
    <a routerLink ="/admin/update" > Update User  </a>
   </li>
   <li>
    <a routerLink ="/admin/delete" > Delete User </a>
   </li>
   </ul>
</div>
</div>
   <router-outlet></router-outlet>
    `
})
export class AdminComponent implements OnInit
{
    constructor(private _router : Router)
    {}
    
    ngOnInit()
    {
        this._router.navigate(['/admin/home']);   
    }
}
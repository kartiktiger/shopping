import {Component, OnInit} from '@angular/core';


@Component({
    selector:'main-app',
    template:`
    <h1> Welcome to Shopping Cart </h1>
    
    <div class='navbar navbar-default'>
        <div class='container'>
            <div class='navbar-header'>
                <a href="/" class='navbar-brand'>Shopping Cart App</a>
            </div>
            
            <ul class='nav navbar-nav'>
            <li>
            <a routerLink ="/home" > Home Page </a>
            </li>
            <li>
            <a routerLink = "/login"> Login/Logout </a>
            </li>
            <li>
            <a routerLink = "/register"> Register </a>
            </li>
            </ul>
        </div>
    </div>
            <hr>
    <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit
{
    constructor()
    {}
    
    ngOnInit()
    {}
}
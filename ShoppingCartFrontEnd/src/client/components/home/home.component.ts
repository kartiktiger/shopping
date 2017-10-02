import {Component, OnInit} from '@angular/core';


@Component({
    template:`
    <h1> Appication Home</h1>
    
    <div class='container'>
    <img src='/assets/images/shopping_cart.jpg'/>
    </div>
    `
})
export class HomeComponent implements OnInit
{
    constructor()
    {}
    
    ngOnInit()
    {}
}
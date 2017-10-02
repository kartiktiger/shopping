import { Component, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../../services/httpprovider.service';
import { UserSession } from '../../../services/user.session';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
    template: `
    <div class="container" >
    <h2 class = 'element-center' style=background-color:black;color:white;> Order Placed Successfully  </h2>


 <div class="table-responsive">
    <table class='table table-hover table-bordered element-center'>
        <tr>
            <th>Sno</th>
            <th>Item Name</th>
            <th>Price</th>
        </tr>
        <tr *ngFor ="let product of cart.products; let i = index">
            <td>{{i+1}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
        </tr>
    </table>
       <div style=font-weight:bold;background-color:black;color:white;>
            <h3>Total Items Purchased : {{totalQuantity}} <br>
             Total Price : {{totalPrice}}</h3>
            </div>
    </div>
    </div>
    `,
    styles: [`.left-align { text-align:left !important;}
            }`]
})
export class PlaceOrderComponent implements OnInit {
    cart: any;
    totalPrice:number=0;
    totalQuantity:number=0;

    constructor(private _httpService: HttpServiceProvider, private _userSession: UserSession, 
    private _activatedRoute : ActivatedRoute, private _router : Router)
    { }

    ngOnInit()
    {
        this._activatedRoute.params.subscribe((params:Params)=>{
            let cart = params['cart'];
            this.cart =JSON.parse(cart);

            console.log("Debug : cart : " + JSON.stringify(this.cart));
            console.log('product in cart : '+this.cart.products); 
    
            for (let product of this.cart.products) {
                this.totalPrice+=product.price;
                console.log('product.price : '+product.price); 

                this.totalQuantity+=product.quantity;
                console.log('product totalQuantity : '+this.totalQuantity); 
             }
        });
    }

}
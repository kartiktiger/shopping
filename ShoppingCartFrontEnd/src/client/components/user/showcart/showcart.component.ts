import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {HttpServiceProvider} from '../../../services/httpprovider.service';
import {UserSession} from '../../../services/user.session';


@Component({
    template:`
  <div class="container" >
    <h3 class = 'element-center'> My Cart  </h3>
    <hr>
    <h1 style=color:red;>{{show_cart}}</h1>
    <div *ngIf="cart">
        <div *ngFor ="let product of cart.products;">
                <div class ="showCartDivCommon"> 
                     <img src='/assets/images/products/{{product.name}}.jpg' style="height:200px;"/>
                </div>
                <div class ="showCartDivCommon"> 
                    Name :  {{product.name}}<br> 
                    Descripton : {{product.descriptions}}<br>
                    Price : {{product.price}}
                </div>
                <div class ="showCartDivRest"></div>
               <hr>
        </div>
        <hr>
    <div *ngIf="cart">
    <hr>
     <button type="submit" (click)="placeOrder(cart)" class='btn btn-primary'>Place Order</button>
    </div>
    </div>
</div>
    `,
    styles :[` .showCartDiv{
                  float:left; 
                  width:100%;
                }
                .showCartDivCommon{
                  float:left; width:25%; border:1px  black;overflow:auto;
                  height:280px;
                  padding-top: 10px; padding-bottom: 10px;padding-left: 5px;
                }
                .showCartDivRest{
                  float:left; width:50%; border:1px  black;
                  height:280px;
                  padding-top: 10px; padding-bottom: 10px;
                }
                .clearing { clear: both; }
                 `]
})
export class ShowCartomponent implements OnInit
{
    userid : string;
    cart : any;
    show_cart:string;

    constructor(private _httpService : HttpServiceProvider,
                private _userSession : UserSession,
                private _router : Router,
                private _activatedRoute : ActivatedRoute)
    {  
     
      }
    
    ngOnInit()
    {
        this._activatedRoute.params.subscribe((params:Params)=>{
            let userid = params['userid'];
             console.log("Debug : userid : " + userid);
            this.userid =userid;
        });


         this._httpService.requestForHttp(this._httpService.domain + "api/user/"+this.userid+"/cart", "GET", null, null).subscribe((data: any) => {
            console.log("Debug : " + JSON.stringify(data));
            this.cart =data;
          },
            (error: any) => {
                                console.log("Error 1 : "+error.message+ " :  Error showing Cart...!");
                                this.show_cart =error.message;    
                            }
        );
    }   

    placeOrder(cart:any)
    {
        console.log("Debug : " + JSON.stringify(cart));
        this._router.navigate([ 'user/placeorder', {cart: JSON.stringify(cart)} ]);
    }
}
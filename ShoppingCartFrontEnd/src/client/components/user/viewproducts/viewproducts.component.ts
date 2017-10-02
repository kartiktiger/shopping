import { Component, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../../services/httpprovider.service';
import { UserSession } from '../../../services/user.session';
import { Router } from '@angular/router';

@Component({
    template: `
    <div class="container" >
    <h1 class = 'element-center'> Products  </h1>

    <div style=color:red;>{{product_added_to_cart_message}}</div>
<br>
    <div *ngFor ="let product of products" class ="showCartDivCommon" [class.showCartDivLeft]="i%2 ==0" [class.showCartDivRight]="i%2 !=0">
        <div>
           <div><img src='/assets/images/products/{{product.name}}.jpg' style="height:200px;"/></div>
           Name :  {{product.name}}<br> 
           Descripton : {{product.descriptions}}<br>
           Price : {{product.price}}
        </div>
        <br>
        <div>
            <button type="submit" (click)="onSubmit(product)" class='btn btn-primary'>Add To Cart</button>
        </div>
        <hr>
    </div>
    </div>
    `,
    styles :[`.showCartDivLeft{
                  float:left;
                }
                .showCartDivRight{
                  float:right; 
                }
                .showCartDivCommon{
                  width:50%; height:400px; border:1px  black;
                  padding-top: 5px; padding-bottom: 5px;
                }
                 `]
})
export class ViewProductsComponent implements OnInit {
    product_added_to_cart_message:string;
    products: any[];

    constructor(private _httpService: HttpServiceProvider, private _userSession: UserSession,  private _router : Router)
    { }

    ngOnInit()
    {
        this._httpService.requestForHttp(this._httpService.domain + "api/products", "GET", null, null).subscribe((products: any) => {
            
            this.product_added_to_cart_message='';
            console.log("Debug : " + JSON.stringify(products));

            if(products == null && products == undefined  )
                {
                     console.log("Error 1 : Something went wrong while retrieving products");
                }
            else{
                     this.products = products;
                }
        }); }

    onSubmit(product:any) {
        console.log('userid : '+this._userSession.userid);
        this._httpService.requestForHttp(this._httpService.domain + "api/user/"+this._userSession.userid+"/product/"+product.id, "POST", null, null).subscribe((data: any) => {
            console.log("Debug : " + JSON.stringify(data));

            this.product_added_to_cart_message = data.message;
            
            this._router.navigate([ 'user/showcart', {userid: this._userSession.userid} ]);
          },
            (error: any) => {
                                console.log("Error 1 :"+error.message+ " : Product not added to cart, please try again...!");
                                this.product_added_to_cart_message =error.message;   
                            }
        );
    }
}
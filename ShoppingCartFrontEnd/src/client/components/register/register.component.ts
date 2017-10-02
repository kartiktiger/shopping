import { Component, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../services/httpprovider.service';
import { UserSession } from '../../services/user.session';
import { Router } from '@angular/router';
 
@Component({
    selector: 'register-user',
    template: `
    <div *ngIf="userRegisteredSuccess == 'success'">
       <H2 class ='col-md-offset-2' style="color:green"> 
           Congratulations...You are registered Successfully <br> <br>  </H2>
                   <h3> <a href='/login' style="color:green" class ='col-md-offset-2'> Click here to login</a>
       </h3>
    </div>

<div *ngIf="userRegisteredError == 'already registered'">
       <h3 class ='col-md-offset-2' style="color:green"> 
           It seems like, you are already registered with us......
                <a href='/login' > Click here to login</a>
       </h3>
    </div>

    <div class='container' *ngIf="userRegisteredSuccess == null">
     
    <div class ='row'>
       <H1 class ='col-md-offset-2'> Register Here</H1>
    </div>
   
    <hr>

    <div *ngIf="userRegistered != null">
       <H3 class ='col-md-offset-2' style="color:green"> You are already registered and logged in</H3>
    </div>

    <form (ngSubmit) ="onSubmit(user)" *ngIf="userRegistered == null" class = 'form-horizontal'>

    <div class ='form-group'>
      <label for ='username' class = 'control-label col-md-offset-2 col-md-1 left-align'> UserName  </label>
      <div class='col-md-7'> 
         <input type="text" [(ngModel)]=user.username [ngModelOptions]="{standalone:true}" 
                placeholder="Eg : Mike" class='form-control'/>
      </div>
   </div>

   <div class ='form-group'>
   <label for ='password' class = 'control-label col-md-offset-2 col-md-1 left-align'> Password  </label>
      <div class='col-md-7'> 
       <input type="password" id='password' [(ngModel)]=user.password [ngModelOptions]="{standalone:true}" 
              placeholder="Eg : 123456" class='form-control'/>
      </div> 
   </div>

    <div class ='form-group'>
     <label for ='name' class = 'control-label col-md-offset-2 col-md-1 left-align'> Name  </label>
      <div class='col-md-7'> 
        <input type="text" id='name' [(ngModel)]=user.name [ngModelOptions]="{standalone:true}" 
               placeholder="Eg : Mike" class='form-control'/>
      </div>
    </div>

    <div class ='form-group'>
     <label for ='age' class = 'control-label col-md-offset-2 col-md-1 left-align'> Age  </label>
      <div class='col-md-7'> 
         <input type="text" id='age' [(ngModel)]=user.age [ngModelOptions]="{standalone:true}" 
                class='form-control'/>
      </div>
    </div>

    <div class ='form-group'>
      <label for ='phone' class = 'control-label col-md-offset-2 col-md-1 left-align'> Phone  </label>
      <div class='col-md-7'> 
        <input type="text" id='phone' [(ngModel)]=user.phone [ngModelOptions]="{standalone:true}" 
               class='form-control'/>
      </div>
    </div>


     <div class ='form-group'>
   <div class='col-md-offset-3 col-md-7'>
    <button type="submit" class='btn btn-primary'>Submit</button>
    <button type="reset" class='btn btn-danger'>Reset</button>
   </div>
 </div>

   </form>
   </div>
    `,
    styles: [`.left-align { text-align:left !important;}
            }`]
})
export class RegisterComponent implements OnInit {
    userRegistered: string;
    userRegisteredSuccess: string;
    userRegisteredError: string;

    user: any = { username: '', password: '', name: '', age: '', phone: '', role: 'user' };

    constructor(private _httpService: HttpServiceProvider,
        private _userSession: UserSession,
        private _router: Router) {
        if (this._userSession.isLoggedin() && _userSession.getUserRole() !== null) {
            console.log(this._userSession.isLoggedin() + " : " + _userSession.getUserRole());
            this.userRegistered = "You are already registered with us and currently logged in...";
        }
    }

    ngOnInit()
    { }

    onSubmit(user: any) {
        this._httpService.requestForHttp(this._httpService.domain + "api/user/registration", "POST", user, null).subscribe((data: any) => {
            console.log("Debug : " + JSON.stringify(data));

            if (data.username !== null && data.username !== undefined && data.role !== null && data.role !== undefined) {
                this._userSession.setDetails(data);
                this.userRegisteredSuccess='success';
            }

        },
        (error: any) => {
                         console.log("Error 1 : Something went wrong while registering user");
                         this.userRegisteredError ='already registered';   
                       }
        )
    }
}
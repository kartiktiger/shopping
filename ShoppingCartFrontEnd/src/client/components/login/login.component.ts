import {Component, OnInit} from '@angular/core';
import {HttpServiceProvider} from '../../services/httpprovider.service';
import {UserSession} from '../../services/user.session';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    template : `
    <div class='container'>

    <div *ngIf="loginError == 'not registered'">
       <h3 class ='col-md-offset-2' style="color:green"> 
           It seems like, you are not registered with us......
                <a href='/register' > Click here to Register</a>
       </h3>
    </div>


    <div class ='row'>
       <H1 class ='col-md-offset-2'> Login Here </H1>
    </div>

    <form (ngSubmit) ="onSubmit(user)" class = 'form-horizontal'>

      <div class ='form-group'>
          <label for ='username' class = 'control-label col-md-offset-2 col-md-1 left-align'> UserName  </label>
         <div class='col-md-7'>
            <input type="text" name='username' [(ngModel)]=user.username [ngModelOptions]="{standalone:true}" 
                   placeholder="Eg : Mike" class='form-control'/>
         </div>
      </div>
   
    <div class ='form-group'>
     <label for ='password' class = 'control-label col-md-offset-2 col-md-1 left-align' > Password </label>
     <div class='col-md-7'>
       <input type="password" id='password' [(ngModel)]=user.password [ngModelOptions]="{standalone:true}" 
               placeholder="123456" class='form-control' />
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
export class LoginComponent implements OnInit
{
    loginError: string;

    user:any = {username:'', password:''};
    constructor(private _httpService: HttpServiceProvider,
                private _userSession: UserSession,
                private _router: Router)
    {
        if(this._userSession.isLoggedin() || _userSession.getUserRole() !== null)
        {
            console.log(this._userSession.isLoggedin()  + " : " +_userSession.getUserRole);
            this._userSession.resetDetails();
            this._router.navigateByUrl('/login');
        }
    }

    ngOnInit()
    {}

    onSubmit(user:any)
    {
            this._httpService.requestForHttp(this._httpService.domain + "api/user/login","POST", user, null).subscribe((data:any) => {
            console.log("Debug : " +JSON.stringify(data) );
        
            if(data.username !== null && data.username !== undefined && data.role !== null && data.role !== undefined )
            {
                this._userSession.setDetails(data);
                if(this._userSession.getUserRole() =='user')
                {
                    console.log("user : " +JSON.stringify(data) );
                    this._router.navigateByUrl('/user');
                }
                else if (this._userSession.getUserRole() =='admin')
                {
                    console.log("admin : " +JSON.stringify(data) );
                    this._router.navigateByUrl('/admin');
                }
                else
                {
                    console.log("Error 1 : Something went wrong while logging in user");
                }
            }
        },
        (error: any) => {
                          console.log("Error 2 : Something went wrong while logging in user");
                          this.loginError ='not registered';  
                       }
        );
    }
}
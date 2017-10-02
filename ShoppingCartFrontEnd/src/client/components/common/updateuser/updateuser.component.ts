import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {HttpServiceProvider} from '../../../services/httpprovider.service';
import {UserSession} from '../../../services/user.session';


@Component({
    template:`
    <div class='container'>

    <div class ='form-group'>
       <H1 class ='col-md-offset-2'> Update User   </H1>
    </div>

    <form (ngSubmit) ="onSubmit(user)" class = 'form-horizontal'>

      <div class ='form-group'>
          <label for ='username' class = 'control-label col-md-offset-2 col-md-2 left-align'> UserName </label>
          <div class='col-md-7'>
            <input type="text" id='username' [(ngModel)]=user.username [ngModelOptions]="{standalone:true}" 
                   disabled="true"  class ='form-control' />
          </div>
      </div>

      <div class ='form-group'>
        <label for ='name' class = 'control-label col-md-offset-2 col-md-2 left-align'> Name  </label>
        <div class='col-md-7'>
          <input type="text" id='name'[(ngModel)]=user.name [ngModelOptions]="{standalone:true}" class ='form-control'/>
        </div>
      </div>

<div class ='form-group'>
       <label for ='phone' class = 'control-label col-md-offset-2 col-md-2 left-align'> Phone  </label>
         <div class='col-md-7'>
    <input type="text" id='phone' [(ngModel)]=user.phone [ngModelOptions]="{standalone:true}"  class ='form-control'/>
    </div>
      </div>

    <div class ='form-group'>
       <label for ='age' class = 'control-label col-md-offset-2 col-md-2 left-align'> Age  </label>
         <div class='col-md-7'>
    <input type="text" id='age' [(ngModel)]=user.age [ngModelOptions]="{standalone:true}"  class ='form-control'/>
    </div>
      </div>

     <div class ='form-group'>
       <label for ='role' class = 'control-label col-md-offset-2 col-md-2 left-align'> Role  </label>
         <div class='col-md-7'>
    <input type="text" id='role' [(ngModel)]=user.role [ngModelOptions]="{standalone:true}" 
         disabled="true" class ='form-control'/>
    </div>
      </div>

     <div class ='form-group'>
   <div class='col-md-offset-4 col-md-6'>
    <button type="submit" class='btn btn-primary'>Update User</button>
    <button type="reset" class='btn btn-danger'>Reset</button>
   </div>
 </div>

   </form>
    </div>
    `,
    styles: [`.left-align { text-align:left !important;}
            }`]
})
export class UpdateUserComponent implements OnInit
{
    user:any;
    constructor(private _httpService : HttpServiceProvider,
                private _userSession : UserSession,
                private _router : Router,
                private _activatedRoute : ActivatedRoute)
    {  
        var params =  _activatedRoute.snapshot.params;

        let user = JSON.parse(params['user']);
        console.log(user);
        
        this.user=user;
    }
    
    ngOnInit()
    {
   
    }   
    
    onSubmit(user:any)
    {
      this._httpService.requestForHttp(this._httpService.domain + "api/user/update","POST", user , null).subscribe( (updateduser:any) => {
      console.log("Debug : " +JSON.stringify(updateduser) );
 
      if(updateduser && updateduser !== undefined )
        {
            console.log("updateduser : " +updateduser);
            this._router.navigate([ 'updateusersuccess', {  username: updateduser.username}]);
        }
      else
        {
          console.log("Error  : Something went wrong while updating user");
        }
})
    }


}
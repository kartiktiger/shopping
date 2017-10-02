import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'; 

import {routing,appRoutingProviders} from './routes/app.routes';

import {HttpServiceProvider} from './services/httpprovider.service';
import {UserSession} from './services/user.session';

import {AppComponent}  from './components/main/app.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';


import {UserComponent} from './components/user/main/user.component';
import {UserHomeComponent} from './components/user/home/userhome.component';
import {ViewProductsComponent} from './components/user/viewproducts/viewproducts.component';
import {ShowCartomponent} from './components/user/showcart/showcart.component';
import {PlaceOrderComponent} from './components/user/placeorder/placeorder.component';


import {AdminComponent} from './components/admin/main/admin.component';
import {AdminHomeComponent} from './components/admin/home/adminhome.component';
import {ViewUsersComponent} from './components/admin/viewusers/viewusers.component';
import {UpdateUserComponent} from './components/common/updateuser/updateuser.component';
import {DeleteUserComponent} from './components/admin/deleteuser/deleteuser.component';

import {UpdateUserSuccessComponent} from './components/common/updateuser/updateusersuccess.component';
import {DeleteUserSuccessComponent} from './components/admin/deleteuser/deleteusersuccess.component';

@NgModule({
  imports:[BrowserModule, CommonModule, HttpModule, FormsModule, routing],
  
  declarations: [AppComponent, 
  HomeComponent, LoginComponent, RegisterComponent,
  UserComponent,UserHomeComponent, ViewProductsComponent,ShowCartomponent,PlaceOrderComponent,
  AdminComponent,AdminHomeComponent, ViewUsersComponent, UpdateUserComponent,
  UpdateUserSuccessComponent,DeleteUserComponent,DeleteUserSuccessComponent],

  providers: [appRoutingProviders,HttpServiceProvider, UserSession],

  bootstrap: [AppComponent]
})
export class AppModule
{

}
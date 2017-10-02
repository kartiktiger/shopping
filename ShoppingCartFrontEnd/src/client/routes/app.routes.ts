import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from '../components/home/home.component';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';

import {UserComponent} from '../components/user/main/user.component';
import {UserHomeComponent} from '../components/user/home/userhome.component';
import {ViewProductsComponent} from '../components/user/viewproducts/viewproducts.component';
import {ShowCartomponent} from '../components/user/showcart/showcart.component';
import {PlaceOrderComponent} from '../components/user/placeorder/placeorder.component';

import {AdminComponent} from '../components/admin/main/admin.component';
import {AdminHomeComponent} from '../components/admin/home/adminhome.component';
import {ViewUsersComponent} from '../components/admin/viewusers/viewusers.component';
import {UpdateUserComponent} from '../components/common/updateuser/updateuser.component';
import {DeleteUserComponent} from '../components/admin/deleteuser/deleteuser.component';

import {UpdateUserSuccessComponent} from '../components/common/updateuser/updateusersuccess.component';
import {DeleteUserSuccessComponent} from '../components/admin/deleteuser/deleteusersuccess.component';

export const appRoutes: Routes =[
 {path:'',component:HomeComponent},
 {path:'home',component:HomeComponent},
 {path:'login',component:LoginComponent},
 {path:'register',component:RegisterComponent},
 {path:'updateusersuccess',component:UpdateUserSuccessComponent},
 {path:'deleteusersuccess',component:DeleteUserSuccessComponent},
 
 {path:'user',component:UserComponent, children: [
       {path:'home',component:UserHomeComponent},
       {path:'viewproducts',component:ViewProductsComponent},
       {path:'showcart',component:ShowCartomponent},
       {path:'placeorder',component:PlaceOrderComponent},
       {path:'updateuser',component:UpdateUserComponent}
       
   ]},

  {path:'admin', component:AdminComponent, children : [
        {path:'home',component:AdminHomeComponent},
        {path:'view',component:ViewUsersComponent},
        {path:'update',component:ViewUsersComponent},
        {path:'delete',component:ViewUsersComponent},
        {path:'deleteuser',component:DeleteUserComponent},
        {path:'updateuser',component:UpdateUserComponent}

  ]},
  
   {path:'**', redirectTo:'',pathMatch: 'full'},
];

export const appRoutingProviders: any[] =[];

export const routing:ModuleWithProviders= RouterModule.forRoot(appRoutes);

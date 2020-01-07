import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {EditUserComponent } from "./edit-user/edit-user.component";
import {AddUserComponent } from "./add-user/add-user.component";
import {LoginComponent } from "./login/login.component";


const routes: Routes = [
  {path : '', component : LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'edit-user', component: EditUserComponent },  
  { path: 'add-user', component: AddUserComponent },
  {path : 'login', component : LoginComponent,}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
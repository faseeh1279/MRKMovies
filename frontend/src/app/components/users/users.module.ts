import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    UsersRoutingModule, 
    SharedModule
  ]
})
export class UsersModule { }

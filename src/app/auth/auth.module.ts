import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent
  ]
})
export class AuthModule { }

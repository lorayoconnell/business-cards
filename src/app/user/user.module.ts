import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserProfileComponent,
    NewUserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }

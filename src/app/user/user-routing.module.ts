import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewUserComponent } from './new-user/new-user.component';


const userRoutes: Routes = [

{ path: '', redirectTo: '/profile', pathMatch: 'full' },
{ path: 'profile', component: UserProfileComponent },
{ path: 'newuser', component: NewUserComponent }
// need '**' ?

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../auth/auth.guard';


const userRoutes: Routes = [

{ path: '', redirectTo: '/profile', pathMatch: 'full' },
{ path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
// need '**' ?

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

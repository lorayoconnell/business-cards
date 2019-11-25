import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }            from './auth.guard';
import { AuthService }          from './auth.service';
import { LoginComponent }       from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, //canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent }, // ?, canActivate: [AuthGuard] 
  //{ path: '**', } necessary to route to NotFound or does that happen automatically in the main routing module?
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
  //providers: [AuthGuard]  // added
})
export class AuthRoutingModule { }




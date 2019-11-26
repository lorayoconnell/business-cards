import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'cardlist', loadChildren: () => import('./cards/cards.module').then(mod => mod.CardsModule) },
  { path: 'profile', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    {
      enableTracing: false // <-- debugging purposes only
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'logout', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
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


/*
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), canLoad: [AuthGuard] },
  { path: 'crisis-center', loadChildren: () => import('./crisis-center/crisis-center.module').then(mod => mod.CrisisCenterModule), data: { preload: true } },
  { path: '',   redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
*/

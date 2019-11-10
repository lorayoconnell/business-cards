import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot,
        CanActivateChild, CanLoad, Route, UrlTree } from '@angular/router';  // NavigationExtras,
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }

}

    // Create a dummy session id
    // let sessionId = 123456789;



/*
  // AuthGuard from chatApp
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
          }
      })
    );
  }
*/


/*
  // SignedInAuthGuard from chatApp
    canActivate(): boolean {
    if (this.auth.isSignedIn()) {
        this.router.navigate(['/chat']);
        return false;
    }
    else { return true; }
  }
*/


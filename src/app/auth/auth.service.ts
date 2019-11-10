import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {


  }



  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isSignedIn(): boolean {
    return this.isLoggedIn;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.isLoggedIn = true;
      this.router.navigateByUrl('/profile');
    })
    .catch(err => {
      window.alert("Incorrect email or password. Try again.");    // or set message that displays on screen
      console.log('Something went wrong: ', err.message);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      console.log("Logged out");
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }

  loginn(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }



/*
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
     console.log('Success', value),
     this.router.navigateByUrl('/profile');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }
*/



/*
  emailSignup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(value => {
     console.log('Success', value);
     this.router.navigateByUrl('/profile');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }
*/



}

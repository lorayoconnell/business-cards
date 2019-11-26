import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../user/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { NgZone } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  subscr: Subscription;
  user: User;
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,
    private router: Router, private userService: UserService, private ngZone: NgZone ) {
  }

  isSignedIn(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Login successful');
      this.isLoggedIn = true;
    })
    .catch(err => {
      window.alert("Incorrect email or password. Try again.");    // or set message that displays on screen
      console.log('Something went wrong: ', err.message);
    });

  }

  gotoCardlist() {
    this.router.navigateByUrl('/cardlist');
  }

  logout() {                                                      // unsubscribe from 3
    this.afAuth.auth.signOut().then(() => {
      console.log("Logged out");
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }

  googleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        console.log("Successfully logged in via Google");
        this.isLoggedIn = true;
        this.ngZone.run(() => this.router.navigateByUrl('/cardlist'));
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  createAccount(email: string, password: string) {

console.log("inside createAccount in authService");

    //return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {   // value.email and value.password to avoid actually seeing info
      
        //resolve(res);

        console.log("Successfully created account");  // success message
        this.router.navigateByUrl('/profile');

      })
      .catch(err => {
        console.log("Error: " + err.message);
      });
      //}, err => reject(err));
    //});
  }





/*
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res => {
    })
    .catch (err => {
      
    });
*/





  /*
  sendResetPasswordLink() {
    const userEmail = this.userService.getUserEmail();
    admin.auth().generatePasswordResetLink(userEmail)
      .then((link) => {
        return sendCustomPasswordResetEmail(email, displayName, link);
      })
      .catch((error) => {
        console.log("Error: " + error.message);
      });
  }
*/


sendResetPasswordLink(userEmail) {

if (userEmail !== null) {

  this.afAuth.auth.sendPasswordResetEmail(userEmail).then(function() {
    // email sent
    console.log("Email has been sent"); // display message to user
  })
  .catch(function(error) {
    console.log("Error: " + error);
  });
}

}

}

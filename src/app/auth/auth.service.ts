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

console.log("email: " + email);


    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Login successful');
      this.isLoggedIn = true;
      this.gotoCardlist();
    })
    .catch(err => {
      window.alert("Incorrect email or password. Try again.");
      console.log('Something went wrong: ', err.message);
    });
  }


    /*
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(val => {
        console.log('Login successful');
        this.isLoggedIn = true;
        this.gotoCardlist();
      })
      .catch(err => {
        window.alert("Incorrect email or password. Try again.");
        console.log('Something went wrong: ', err.message);
      });
*/

/*
 firebase.auth().signInWithEmailAndPassword(email, password);

login(email: string, password: string) {
  this.afAuth.auth.signInWithEmailAndPassword(email, password)
  .then(value => {
    console.log('Login successful');
    this.isLoggedIn = true;
    this.gotoCardlist();
  })
  .catch(err => {
    window.alert("Incorrect email or password. Try again.");
    console.log('Something went wrong: ', err.message);
  });
}
*/  
  



  gotoCardlist() {
    this.router.navigateByUrl('/cardlist');
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      console.log("Logged out");
      this.isLoggedIn = false;
    }).then(res => {
      this.router.navigate(['/login']);
    })
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

//  createAccount(email: string, password: string) {
createAccount(formData) {

  //formData.value.userEmail
// this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
    this.afAuth.auth.createUserWithEmailAndPassword(formData.value.userEmail, formData.value.userPassword).then(res => {
      console.log("Successfully created account");

      this.user = new User();

      this.user.email = formData.value.userEmail;
      this.user.firstName = formData.value.firstName;
      this.user.lastName = formData.value.lastName;
      // get the user id that was created
      this.user.userId = res.user.uid;
      console.log("userId: " + this.user.userId);
      console.log("firstName: " + this.user.firstName);
      console.log("lastName: " + this.user.lastName);
      console.log("email: " + this.user.email);

      this.userService.createUser(this.user.userId, this.user.firstName, this.user.lastName, this.user.email);

      //this.userService.createUser(this.user);
      //this.login(this.user.email,formData.value.userPassword);
      //this.router.navigateByUrl('/profile');



    })
    .catch(err => {
      console.log("*** Error: " + err.message);
    });
  }


  sendResetPasswordLink(userEmail): boolean {
    if (userEmail != null) {
      this.afAuth.auth.sendPasswordResetEmail(userEmail).then(function() {
        console.log("Email has been sent");
        return true;
      })
      .catch(function(error) {
        console.log("Error: " + error);
        return false;
      });
    }
    return false;
  }

}

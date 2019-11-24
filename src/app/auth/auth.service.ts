import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  subscr: Subscription;
  user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isSignedIn(): boolean {
    // this.card.userId = 
    //console.log(this.afAuth.auth.currentUser.uid);
    return this.isLoggedIn;
  }

  login(email: string, password: string) {
    console.log("auth.service.... login");
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.isLoggedIn = true;
      this.router.navigateByUrl('/cardlist');
    })
    .catch(err => {
      window.alert("Incorrect email or password. Try again.");    // or set message that displays on screen
      console.log('Something went wrong: ', err.message);
    });
  }

  logout() {    // unsubscribe from 3
    this.afAuth.auth.signOut().then(() => {
      console.log("Logged out");
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }



  googleLogin() {
console.log("this is where google login needs to be implemented");
// https://angularfirebase.com/lessons/google-user-auth-with-firestore-custom-data/
    /*
    const provider = new firebase.auth.GoogleAuthProvider();
    //return this.oAuthLogin(provider)
    return this.afAuth.auth.signInWithPopup(provider)
      .then(value => {
     console.log('Success', value);
        this.isLoggedIn = true;
        console.log("cred")
     this.router.navigateByUrl('/profile');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
*/
  }


/*
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(
      (credential) => {
        this.up
      }
    )
  }
*/


  createAccount(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res => {
      // success message
    })
    .catch (err => {
      console.log("Error: " + err.message);
    });
  }

  
}





  /*
  loginn(): Observable<boolean> {
    console.log("auth.service.... loginn");
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }
*/

/*
  signin() { // login() {
    console.log("auth.service.... signin");
    this.subscr = this.loginn().subscribe(() => {
      console.log("SUBSCRIBING");
      if (this.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.redirectUrl ? this.router.parseUrl(this.redirectUrl) : '/admin';
        // Redirect the user
        this.router.navigateByUrl(redirect);  //, navigationExtras);
      }
    });
  }
*/






/*
  getCard(cardd: Card): Card {
    var docRef = this.db.collection("cards").doc(cardd.id);
    docRef.snapshotChanges().subscribe(
      res => {
        cardd.displayName = res.payload.get('displayName');
        cardd.firstName = res.payload.get('firstName');
        cardd.lastName = res.payload.get('lastName');
        cardd.organizationName = res.payload.get('organizationName');
        cardd.phone = res.payload.get('phone');
        cardd.fax = res.payload.get('fax');
        cardd.email = res.payload.get('email');
        cardd.cardImage = res.payload.get('cardImage');
        cardd.userId = res.payload.get('userId');
      }
    );
    return cardd;
  }
*/



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


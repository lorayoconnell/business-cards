import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../user/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  subscr: Subscription;
  user: User;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

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
      this.router.navigateByUrl('/cardlist');
    })
    .catch(err => {
      window.alert("Incorrect email or password. Try again.");    // or set message that displays on screen
      console.log('Something went wrong: ', err.message);
    });
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
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }


 // ggoogleLogin() {
  //    console.log("this is where google login needs to be implemented");
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



          private oAuthLogin(provider) {
              return this.afAuth.auth.signInWithPopup(provider).then(
                (credential) => {
                }
              )
            }



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

 // }



  createAccount(email: string, password: string) {

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)   // value.email and value.password to avoid actually seeing info
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })

/*
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res => {
      // success message
      this.router.navigateByUrl('/profile');
    })
    .catch (err => {
      console.log("Error: " + err.message);
    });
*/


  }

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

}

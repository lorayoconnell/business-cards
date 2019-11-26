import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  user: User;
  subscr: Subscription;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) { }

  getUser(u: User): User {
    var docRef = this.db.collection("users").doc(u.userId);
    console.log("SUBSCRIBING to user");
    this.subscr = docRef.snapshotChanges().subscribe(
      res => {
        u.email = res.payload.get('email');
        u.firstName = res.payload.get('firstName');
        u.lastName = res.payload.get('lastName');
      }
    );
    return u;
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
        var user = this.afAuth.auth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  getUserEmail(): string {
    return this.afAuth.auth.currentUser.email;
  }

  getUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }


createUser(uid:string, fn:string, ln:string, em:string) {
    this.db.collection("users").doc(uid).set({
      firstName: fn,
      lastName: ln,
      email: em
    });
  }

  updateUser(user: User) {
    var userRef = this.db.collection("users").doc(user.userId);
    /*
    this.afAuth.auth.currentUser.updateEmail(newEmail).then(function() {
      console.log("Email has been successfully updated")
    })
    .catch(function(error) {
      console.log("Error: " + error);
    })
    */
    return userRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    .then(function() {
      console.log("User data has been updated.");
    })
    .catch (function(error) {
      console.error("Error updating user document: " + error);
    });
  }

  displayUserInfoOnConsole(user: User) {
    console.log("user.service: userId: " + user.userId + " userEmail: " + user.email + " userFirstName: " + user.firstName + " userLastName: " + user.lastName);
  }

  ngOnDestroy(): void {
    console.log("UNSUBSCRIBING");
    this.subscr.unsubscribe();
  } 

}

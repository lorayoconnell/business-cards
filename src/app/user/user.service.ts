import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  user: User;
  subscr: Subscription;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) { }

  getUser(u: User): User {
    var docRef = this.db.collection("users").doc(u.userId);
    console.log("SUBSCRIBING!!");
    this.subscr = docRef.snapshotChanges().subscribe(
      res => {
        u.email = res.payload.get('email');
        u.firstName = res.payload.get('firstName');
        u.lastName = res.payload.get('lastName');
      }
    );
    return u;
  }

  //getUserEmail(): string {
  //  return this.afAuth.auth.currentUser.email;
  //}

  getUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  createUser(user: User): void {
    this.db.collection("users").add({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    .then(function(docRef) {
      user.userId = docRef.id;
      console.log("New user recorded with userId: " + docRef.id);
    })
    .catch( function(error) {
      console.error("Error adding user: " + error);
    });
  }

  updateUser(user: User) {
    var userRef = this.db.collection("users").doc(user.userId);
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


  //displayUserInfoOnConsole(user: User) {
  //  console.log("user.service: userId: " + user.userId + " userEmail: " + user.email + " userFirstName: " + user.firstName + " userLastName: " + user.lastName);

  //}

  ngOnDestroy(): void {
    console.log("UNSUBSCRIBING");
    this.subscr.unsubscribe();
  } 

}


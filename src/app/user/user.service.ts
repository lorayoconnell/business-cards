import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService { // implements OnDestroy {

  //subscr$;
  user: User;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) { }

  getUser(u: User): User {
    var docRef = this.db.collection("users").doc(u.userId);
    //this.subscr$ = 
    docRef.snapshotChanges().subscribe(
      res => {
        u.userId = res.payload.get('userId');
        u.userEmail = res.payload.get('userEmail');
        u.firstName = res.payload.get('firstName');
        u.lastName = res.payload.get('lastName');
      }
    );
    return u;
  }

  getUserEmail(): string {
    return this.afAuth.auth.currentUser.email;
  }

  getUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  createUser(user: User): void {
    this.db.collection("users").add({
      firstName: user.firstName,
      lastName: user.lastName,
      userEmail: user.userEmail
    })
    .then(function(docRef) {
      user.userId = docRef.id;
      console.log("New user recorded with userId: " + docRef.id);
    })
    .catch( function(error) {
      console.error("Error adding user: " + error);
    });
  }

  //ngOnDestroy(): void {

    //this.subscr$.unsubscribe();
    //throw new Error("Method not implemented.");
  //} 

}



/*
  createCard(card: Card): void {
    this.db.collection("cards").add({
      displayName: card.displayName,
      firstName: card.firstName,
      lastName: card.lastName,
      organizationName: card.organizationName,
      phone: card.phone,
      fax: card.fax,
      email: card.email,
      cardImage: card.cardImage,
      userId: this.afAuth.auth.currentUser.uid
    })
    .then(function(docRef) {
      card.id = docRef.id;
      console.log("Document written with id: " + docRef.id);
    })
    .catch (function (error) {
      console.error("Error adding document: " + error);
    });
  }
*/
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
    console.log("SUBSCRIBING!!");
    docRef.snapshotChanges().subscribe(
      res => {
       //u.userId = res.payload.get('userId');
        u.email = res.payload.get('email');
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


  displayUserInfoOnConsole(user: User) {

    console.log("user.service: userId: " + user.userId + " userEmail: " + user.email + " userFirstName: " + user.firstName + " userLastName: " + user.lastName);

  }



  //ngOnDestroy(): void {

    //this.subscr$.unsubscribe();
    //throw new Error("Method not implemented.");
  //} 

}


/*
  updateCard(c: Card) {
    var cardRef = this.db.collection('cards').doc(c.id);
    return cardRef.update({
      displayName: c.displayName,
      firstName: c.firstName,
      lastName: c.lastName,
      organizationName: c.organizationName,
      phone: c.phone,
      fax: c.fax,
      email: c.email,
      additionalInfo: c.additionalInfo,
      cardImage: c.cardImage,
      userId: this.afAuth.auth.currentUser.uid
    })
    .then(function() {console.log("Document successfully updated");})
    .catch(function(error) {console.error("Error updating document: ", error);});
  }
*/




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
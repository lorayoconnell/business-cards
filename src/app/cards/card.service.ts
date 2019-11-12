import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from './card.model';
import { CARDS } from './mock-cards';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class CardService {
  @Input() card: Card;

  private cardDoc: AngularFirestoreDocument<Card>;
  private dbPath = '/cards'; // cardlist?
  cards$: Observable<Card[]>;
  c: Card;

  //cardRef: AngularFireList<Card> = null;
  //cardDbRef: AngularFirestore;
  //cardCollectionRef: AngularFirestore;
  //carddd: Card;
  //ccc: Card;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { }

/*
  docRef.get().then(function(doc) {
    if (doc.exists) { console.log("exists"); }
    else { console.log("No such document."); }
  }).catch(function(error) {
    console.log("Error getting document: " + error);
  })
*/

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

  updateCard(cc: Card) {
    var cardRef = this.db.collection('cards').doc(cc.id);
    return cardRef.update({
      displayName: cc.displayName,
      firstName: cc.firstName,
      lastName: cc.lastName,
      organizationName: cc.organizationName,
      phone: cc.phone,
      fax: cc.fax,
      email: cc.email,
      cardImage: cc.cardImage,
      userId: this.afAuth.auth.currentUser.uid
    })
    .then(function() {console.log("Document successfully updated");})
    .catch(function(error) {console.error("Error updating document: ", error);});
  }

  deleteCard(cccc: Card) {

    var cardRef = this.db.collection('cards').doc(cccc.id);
    cardRef.delete();
    console.log("Document deleted.");


    // Get the card document
  //  this.cardDoc = this.db.doc<Card>
  //  (`${"cards"}/${id}`);
    // Delete the document
  //  this.cardDoc.delete();
  }

  getCards(): Observable<Card[]> {
    console.log("this is where I should be getting the list from the db");
    return of(CARDS);
  }

  showThisCard(card: Card) {


    // route to cardcomponent with card as parameter
    console.log("inside cardservice. send card to indiv card component");

  }




}







/*

thisFunction() {
this.cards$ = this.db.collection<Card>('cards') //.valueChanges()
.snapshotChanges().pipe(map(collection => {
return collection.map(c => {
let card = new Card();
card.lastName = c.payload.doc.data().lastName;
console.log("card.lastName: " + card.lastName);return card;
});
}));
}

thisFunction2(i: string): Card {
this.c = new Card();
this.db.collection<Card>('cards').doc(i)
.snapshotChanges().pipe(map(carddd => {
this.c = carddd.payload.data() as Card;
this.c.lastName = carddd.payload.get('lastName');
})
)
return this.c;
}

*/

/*
{
  "rules": {
    ".read": "auth !=null",
    ".write": "auth !=null"
  }
}
*/

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if (auth != null);
    }
  }
}
*/

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
*/




  //deleteCard(key: string): Promise<void> {
    //return this.cardRef.remove(key);
  //}

  //getCardsList(): AngularFireList<Card> {
  //  return this.cardRef;
  //}





// getCards(): Observable<Card[]> {
    /*
    this.db.collection("cards").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
      })
    })
*/

// this.cards = this.db.collection("cards").valueChanges();


/*
this.cards = this.db.collection("cards")
.snapshotChanges()
.pipe(
  map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as Card;
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  })
)
*/

//return this.cards;

// }
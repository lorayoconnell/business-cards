import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from './card.model';
import { CARDS } from './mock-cards';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class CardService {

  private cardDoc: AngularFirestoreDocument<Card>;
  private dbPath = '/cards'; // cardlist?
  cardRef: AngularFireList<Card> = null;
  cardDbRef: AngularFirestore;
  cards: Observable<any[]>;
  cardCollectionRef: AngularFirestore;

  constructor(private db: AngularFirestore) {

  }

  createCard(card: Card): void {
    console.log("card.service.ts createCard() but not really (???) creating card: card.displayName: " + card.displayName);
    console.log("this is where I would be pushing the new card to the database");

    this.db.collection("cards").add({
      displayName: card.displayName,
      firstName: card.firstName,
      lastName: card.lastName,
      organizationName: card.organizationName,
      phone: card.phone,
      fax: card.fax,
      email: card.email,
      cardImage: card.cardImage
      // also add the current users id
    })
    .then(function(docRef) {
      card.cardId = docRef.id;
      console.log("Document written with id: " + docRef.id);
    })
    .catch (function (error) {
      console.error("Error adding document: " + error);
    });

    //this.cardRef.push(card);
  }

  updateCard(id, update) {
    // Get the card document
    this.cardDoc = this.db.doc<Card>
    (`${"cards"}/${id}`);
    this.cardDoc.update(update);
  }

  deleteCard(id) {
    // Get the card document
    this.cardDoc = this.db.doc<Card>
    (`${"cards"}/${id}`);
    // Delete the document
    this.cardDoc.delete();
  }


  testingDb(): Observable<any[]> {
    this.cards = this.db.collection("cards").valueChanges();
    return this.cards;
  }

  getCards(): Observable<Card[]> {
    console.log("this is where I should be getting the list from the db");
    return of(CARDS);
  }

  getCard(cardId: string) {    // uid
    return this.getCards().pipe(

      // (+) before `id` turns the string into a number
      // is === ok to use to compare strings
      // card.cardId === +cardId))

      map((cards: Card[]) => cards.find(card => card.cardId === cardId)) 
    );
  }

}










  //displayCards() {

    /*
        this.cards = this.db.collection('cards')
            .snapshotChanges()
            .map(actions => {
              return actions.map(a => {
                // get document data
                const data = a.payload.doc.data() as Card;
                // Get document id
                const id = a.payload.doc.id;
                // use spread operator to add the id to the document data
                return { id, ...data };
              })
            })
    */
  //}



  /*
  displayThisCard(card: Card) {
    displayCard
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





  //updateCard(key: string, value: any): Promise<void> {
    //return this.cardRef.update(key, value);
  //}

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
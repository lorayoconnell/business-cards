import { Injectable, Input, OnDestroy } from '@angular/core';
import { Card } from './card.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchCardService } from './search-card.service';
import { WebcamComponent } from '../webcam/webcam.component';
import { NewCardComponent } from '../cards/new-card/new-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class CardService { //implements OnDestroy {

  //subscr$;
  @Input() card: Card;

  newCardComponent: NewCardComponent;

  scanData: boolean = false;
  scanCard: Card;

  thisCard: Card;
  cardIds: string[];
  cardCollectionRef: AngularFirestoreCollection<Card>;
  card$: Observable<Card[]>;
  selectedCard: Card;
  searchStr: string;

  tempCard: Card;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {  }


/*
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.cardIds = new Array();
    this.cardCollectionRef = this.db.collection('cards');
    this.card$ = this.cardCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Card;
          const id = action.payload.doc.id;
          this.cardIds.push(id);
          console.log("action.payload.doc.id: " + id);
          console.log("data.firstName: " + data.firstName);
          return { id, ...data};
        });
      })
    )
  }

getArrOfCardsIds(): string[] {
  console.log("inside cardService: " + this.cardIds.length);
  return this.cardIds;
}
*/

  getAllCards() {
    return this.db.collection("cards").snapshotChanges();
  }

  getCard(c: Card): Card {
    var docRef = this.db.collection("cards").doc(c.id);
    //this.subscr$ = 
    docRef.snapshotChanges().subscribe(
      res => {
        c.displayName = res.payload.get('displayName');
        c.firstName = res.payload.get('firstName');
        c.lastName = res.payload.get('lastName');
        c.organizationName = res.payload.get('organizationName');
        c.phone = res.payload.get('phone');
        c.fax = res.payload.get('fax');
        c.email = res.payload.get('email');
        c.additionalInfo = res.payload.get('additionalInfo');
        c.cardImage = res.payload.get('cardImage');
        c.userId = res.payload.get('userId');
      }
    );
    return c;
  }

  //ngOnDestroy(): void {

    //this.subscr$.unsubscribe();
    //throw new Error("Method not implemented.");
  //} 


  createCard(c: Card): void {
    this.db.collection("cards").add({
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
    .then(function(docRef) {
      c.id = docRef.id;
      console.log("Document written with id: " + docRef.id);

    })
    .catch (function (error) {
      console.error("Error adding document: " + error);
    });
  }


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

  deleteCard(c: Card) {
    var cardRef = this.db.collection('cards').doc(c.id);
    cardRef.delete();
    console.log("Document deleted.");
  }


  showCard(cardId: string) {
    var cardRef = this.db.collection('cards').doc(cardId);
    this.router.navigate(['/card/', cardId]);
  }



  gotoWebcam() {
    
  }

  getWebcamInfo(c: Card) {
    console.log("getWebcamInfo: c.toString: " + c.toString());
    this.scanData = true;
    this.scanCard = c;


    // route to newcardcomponent and add a param = new

this.router.navigate(['/newcard', { par: 'new' }]); // in case we want other paramaters passed


/*
<button routerLink="/newcard" routerLinkActive="active">Add New Card</button>

<ul class="list">
    <li *ngFor="let card of card$ | async" [class.selected]="card === selectedCard">
        <a [routerLink]="['/card/', card.id]">

         //
*/

    
    //this.newCardComponent.getInfoFromScan(c);
  

// have to push c to newcardcomponent


  }

  getCardInfoFromScan(): Card {
    console.log("getCardInfoFromScan scanCard.toString: " + this.scanCard.toString());
    
    return this.scanCard;

  }




}






//import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from 'angularfire2/firestore';
//import { Observable, of } from 'rxjs';
//import { map } from 'rxjs/operators';
//import { CARDS } from './mock-cards';
//import { CardListComponent } from '../cards/card-list/card-list.component';
//import { CardComponent } from './card/card.component';


  //private cardDoc: AngularFirestoreDocument<Card>;
  //private dbPath = '/cards';
  //cards$: Observable<Card[]>;
  //c: Card;
  //cardIds: string[];

  //getCards(): Observable<Card[]> {
    //console.log("this is where I should be getting the list from the db");
    //return of(CARDS);
  //}

  //getCardIdsArray(arr: String[]): void {
  //getCardIdsArray(): string[] {
    //console.log("inside cardservice. arr.length: " + arr.length);
    //console.log("cardIds.length: " + this.cardIds.length);
    //return this.cardIds;
    //getArrayOfCardIds();
  //}

  //showThisCard(card: Card) {
  //  console.log("inside cardservice. send card to indiv card component");
  //}

/*
  docRef.get().then(function(doc) {
    if (doc.exists) { console.log("exists"); }
    else { console.log("No such document."); }
  }).catch(function(error) {
    console.log("Error getting document: " + error);
  })
*/



    /*
    this.cards$.pipe(map(c => {
      return c.map(cc => {
        this.cardIds.push(cc.id);
        // cc.firstName
      })
    }))

    
*/




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

//}
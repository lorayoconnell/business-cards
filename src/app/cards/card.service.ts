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
import { Subscription } from 'rxjs';

@Injectable()
export class CardService implements OnDestroy {

  @Input() card: Card;

  subscr: Subscription;
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

  getAllCards() {
    //return this.db.collection("cards").snapshotChanges();
    return this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').snapshotChanges();
  }

  getCard(c: Card): Card {

    // var docRef = this.db.collection("cards").doc(c.id);
    var docRef = this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').doc(c.id);

    //this.subscr$ = 
    console.log("SUBSCRIBING to card");
    this.subscr = docRef.snapshotChanges().subscribe(
      res => {
        //c.displayName = res.payload.get('displayName');
        c.firstName = res.payload.get('firstName');
        c.lastName = res.payload.get('lastName');
        c.title = res.payload.get("title");
        c.organizationName = res.payload.get('organizationName');
        c.phone = res.payload.get('phone');
        c.fax = res.payload.get('fax');
        c.email = res.payload.get('email');
        c.website = res.payload.get('website');
        c.additionalInfo = res.payload.get('additionalInfo');
        c.cardImage = res.payload.get('cardImage');
        c.userId = res.payload.get('userId');
      }
    );
    return c;
  }

  ngOnDestroy(): void {
    console.log("UNSUBSCRIBING");
    this.subscr.unsubscribe();
  } 

  createCard(c: Card): void {
    this.db.collection("cards").add({
      //displayName: c.displayName,
      firstName: c.firstName,
      lastName: c.lastName,
      title: c.title,
      organizationName: c.organizationName,
      phone: c.phone,
      fax: c.fax,
      email: c.email,
      website: c.website,
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

  createCardForUser(c: Card): void {
    //userId: this.afAuth.auth.currentUser.uid;

    this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').add({
      //displayName: c.displayName,
      firstName: c.firstName,
      lastName: c.lastName,
      title: c.title,
      organizationName: c.organizationName,
      phone: c.phone,
      fax: c.fax,
      email: c.email,
      website: c.website,
      additionalInfo: c.additionalInfo,
      cardImage: c.cardImage,
      userId: this.afAuth.auth.currentUser.uid
    })
    .then(function (docRef) {
      c.id = docRef.id;
      console.log("Document written with id: " + docRef.id);
    })
    .catch (function (error) {
      console.error("Error adding document: " + error);
    });

  }


  updateCard(c: Card) {
    // var cardRef = this.db.collection('cards').doc(c.id);
    var cardRef = this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').doc(c.id);
    return cardRef.update({
      //displayName: c.displayName,
      firstName: c.firstName,
      lastName: c.lastName,
      title: c.title,
      organizationName: c.organizationName,
      phone: c.phone,
      fax: c.fax,
      email: c.email,
      website: c.website,
      additionalInfo: c.additionalInfo,
      cardImage: c.cardImage,
      userId: this.afAuth.auth.currentUser.uid
    })
    .then(function() {console.log("Document successfully updated");})
    .catch(function(error) {console.error("Error updating document: ", error);});
  }

  deleteCard(c: Card) {
    //var cardRef = this.db.collection('cards').doc(c.id);
    var cardRef = this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').doc(c.id);
    cardRef.delete();
    console.log("Document deleted.");
  }

  showCard(cardId: any) {
    //var cardRef = this.db.collection('cards').doc(cardId);
    this.router.navigate(['/card/', cardId]);
  }

  getWebcamInfo(c: Card) {
    console.log("getWebcamInfo: c.toString: " + c.toString());
    this.scanData = true;
    this.scanCard = c;

    // route to newcardcomponent and add a param = new
    this.router.navigate(['/newcard', { par: 'new' }]); // in case we want other paramaters passed
    //this.router.navigate(['/newcard']);
  }

  getCardInfoFromScan(): Card {
    console.log("getCardInfoFromScan scanCard.toString: " + this.scanCard.toString());
    return this.scanCard;
  }

}

/*
  docRef.get().then(function(doc) {
    if (doc.exists) { console.log("exists"); }
    else { console.log("No such document."); }
  }).catch(function(error) {
    console.log("Error getting document: " + error);
  })
*/

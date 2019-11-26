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
    return this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').snapshotChanges();
  }

  getCard(c: Card): Card {
    var docRef = this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').doc(c.id);
    console.log("SUBSCRIBING to card");
    this.subscr = docRef.snapshotChanges().subscribe(
      res => {
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
    this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').add({
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
    var cardRef = this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').doc(c.id);
    return cardRef.update({
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
    var cardRef = this.db.collection('users/' + this.afAuth.auth.currentUser.uid + '/cards').doc(c.id);
    cardRef.delete();
    console.log("Document deleted.");
  }

  showCard(cardId: any) {
    this.router.navigate(['/card/', cardId]);
  }

  getWebcamInfo(c: Card) {
    console.log("getWebcamInfo: c.toString: " + c.toString());
    this.scanData = true;
    this.scanCard = c;
    // route to newcardcomponent and add a param = new
    this.router.navigate(['/newcard', { par: 'new' }]);
  }

  getCardInfoFromScan(): Card {
    return this.scanCard;
  }

  getDefaultCard(): string {
    return "data:image/png;base64,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"; 
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

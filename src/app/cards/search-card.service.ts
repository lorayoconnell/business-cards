import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Card } from './card.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardService } from './card.service';


@Injectable({
  providedIn: 'root'
})
export class SearchCardService {

  cardCollectionRef: AngularFirestoreCollection<Card>;
  card$: Observable<Card[]>;

  cardArr: Card[];
  cardId: string[];
  card: Card;

  constructor(private afs: AngularFirestore, private cardService: CardService) {
    this.cardCollectionRef = this.afs.collection('cards');
    this.card$ = this.cardCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Card;
          const id = action.payload.doc.id;
          return { id, ...data};
        });
      })
    )
  }

  searchCards(userInput: string) {


    //this.card$.subscribe(cards => {
      // cardsArray.push(this.card.id);
    //});
    //console.log( cardsArray.length );




/*
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
        cardd.additionalInfo = res.payload.get('additionalInfo');
        cardd.cardImage = res.payload.get('cardImage');
        cardd.userId = res.payload.get('userId');
      }
    );
    return cardd;
  }
*/







/*
    var docRef = this.afs.collection("cards");

    this.afs.collection("cards").where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
*/

  }

  /*
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
        cardd.additionalInfo = res.payload.get('additionalInfo');
        cardd.cardImage = res.payload.get('cardImage');
        cardd.userId = res.payload.get('userId');
      }
    );
    return cardd;
  }
  */




}


/*

  getSelectedCard() {
    this.card = new Card;
    this.card.id = this.route.snapshot.paramMap.get('id');
    if (this.card.id != null) {
      this.card = this.service.getCard(this.card);
    }
  }


  cardCollectionRef: AngularFirestoreCollection<Card>;
  card$: Observable<Card[]>;
  selectedCard: Card;



  constructor(private afs: AngularFirestore, private service: CardService, private route: ActivatedRoute) {

  }
*/




/*
https://firebase.google.com/docs/firestore/solutions/search
suggests a third-party search service: Algolia

since this is a fairly small app,
I'll just search manually.....
*/




/*
https://stackoverflow.com/questions/54002758/how-to-get-an-observable-for-data-from-firestore-query-in-angular-7

// Query the users by a specific email and return the first User with ID added    
return this.firestore.collection<User>('users', ref => ref.where('email', 
'==', email))
  .snapshotChanges()
  .pipe(map(users => {
    const user = users[0];
    if (user) {
      const data = user.payload.doc.data() as User;
      const id = user.payload.doc.id;
      return { id, ...data };
    }
    else {
      return null;
    }
  }));
In your Component code you can call this by

checkEmail() {
this.user$ = this.us.getUserByEmail('email@gmail.com')
  .pipe(
    tap(user => {
      if (user) {
        this.msg = 'success';
      } else {
        this.msg = 'User with this email does not exist!';
      }
    }));
}

*/
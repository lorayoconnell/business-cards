import { switchMap, map } from 'rxjs/operators'; // to process the observable route parameters
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  cardId: string;
  data: string[];
  c: Card;

//  thisCard: Card;
//  c: any;
 // card$: Observable<Card>;
cardCollectionRef: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router, private service: CardService) {
    //route.params.subscribe(
    //  data => console.log('params', data['id']));
    route.params.subscribe(
      data => this.cardId = data['id']);
      // console.log("this.cardId: " + this.cardId);
      this.showThisStupidCard(this.cardId);
  }

  ngOnInit() {
    //this.card$ = this.afs.doc<Card>('card/' + this.id).valueChanges();
    //this.route.params.subscribe(params => {
    //  this.c = this.afs.collection('cards').get('/card/' + params['id']);
    //});
  //  this.card$ = this.route.paramMap.pipe(
  //    switchMap((params: ParamMap) =>
  //    this.service.getCard(params.get('id')))
  //  );
  }

editCard(card: Card) {
  console.log("edit card method");
  // change the text fields to input fields to allow for updating
  // also show update button
  // also give big read button to delete the card
}

showThisStupidCard(id: string) {


  console.log("showThisStupidCard: card.id: " + id);



var docRef = this.afs.collection("cards").doc(id);
console.log("docRef: " + docRef);


  //this.cardCollectionRef.doc(id).get();


  //var docRef = this.afs.collection("cards").doc(id);

  //console.log( docRef.get() );

 //console.log("wtf " + this.something(id).email.value );

// FriendlyEats.prototype.getRestaurant = function(id) {
 // return firebase.firestore().collection('cards').doc(id).get();
// }


  /*
  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("exists");
    }
    else {
      console.log("No such document.");
    }
  }).catch(function(error) {
    console.log("Error getting document: " + error);
  })
*/


}

something(id: string): any {
  return this.afs.collection('cards').doc(id).get();
}





/*
  displayCard(card: Card) {
    this.card$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getCard(params.get('id')))
    );
  }
*/


  // go back to the list
  // passing parameters back to list:
  // ex: localhost:4200/heroes;id=15;foo=foo
  // The optional route parameters are not separated by "?" and "&" as they would be
  // in the URL query string. They are separated by semicolons ";" This is matrix URL
  // notation—something you may not have seen before.
  gotoCards(card: Card) {
    let cId = card ? card.id : null;
    // pass along the card id if available so that
    // the CardList component can select that card
    this.router.navigate(['/cards', { id: cId, foo: 'foo' }]); // in case we want other paramaters passed
  }





}

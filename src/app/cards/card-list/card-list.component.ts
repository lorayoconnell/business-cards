import { Observable, pipe, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { CARDS } from '../mock-cards';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cardCollectionRef: AngularFirestoreCollection<Card>;
  card$: Observable<Card[]>;
  selectedCard: Card;

  constructor(private afs: AngularFirestore, private service: CardService, private route: ActivatedRoute) {
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

  ngOnInit() {
    //this.getCardList();
  }

  addCard() {
    console.log("add card method");
    // route to newcardcomponent
  }

  getThisCard(card: Card) {
    console.log("getThisCard: card.id: " + card.id);
  }


  onSelect(card: Card): void {
    //console.log("onSelect card.id: " + card.id);
    this.selectedCard = card;
    //this.service.showThisCard(card);
    // CardComponent.displayCard(card);
    //CardComponent.displayThisCard(card);
  }





/*
  addTodo(todoDesc: HTMLInputElement) {
    if (todoDesc.value && todoDesc.value.trim().length) {
      this.todoCollectionRef.add({description: todoDesc.value, completed: false });
    }
  }
*/

/*
  updateTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }
*/

/*
  deleteTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }
*/





//getCardList(): void {}






}





    //this.cards$ = service.getCards();
    //this.showCards();
    //console.log("maybe got some cards?");






    /*
    this.cards$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        console.log("ngoninit got cards?");
        return this.service.getCards();

      })
    );
*/






//  getCardList(): void {

    // getCards() returns a single value: the array of mock cards
   // this.cards = this.service.testingDb();
   // this.cards$ = this.service.getCards();
/*
    this.cards$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.getCards();
      })
    )
*/
//  this.service.getCards().subscribe(cards => this.cards$ = this.cards$);
// from tour of heroes example:
    //this.service.getCards()
      //.subscribe(cards => this.cards = cards);

    //  returns Observable<any[]>

 // }
import { Observable, pipe, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card.model';
// import { CARDS } from '../mock-cards';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { CardComponent } from '../card/card.component';
import { SearchCardService } from '../search-card.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  thisCard: Card;
  cardIds: string[];
  cardCollectionRef: AngularFirestoreCollection<Card>;
  card$: Observable<Card[]>;
  selectedCard: Card;
  searchStr: string;
  viewList: boolean = true;

// 'users/' + this.authService.getCurrentUserId() + '/cards'

  constructor(private afs: AngularFirestore, private service: CardService, private searchService: SearchCardService,
    private route: ActivatedRoute, private authService: AuthService) {
    this.cardIds = new Array();

    //this.cardCollectionRef = this.afs.collection('cards');
    this.cardCollectionRef = this.afs.collection('users/' + this.authService.getCurrentUserId() + '/cards');

    this.card$ = this.cardCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Card;
          const id = action.payload.doc.id;
          this.cardIds.push(id);
          return { id, ...data};
        });
      })
    )
  }

  ngOnInit() {
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }

  viewAsCards() {
    this.viewList = false;
  }

  viewAsList() {
    this.viewList = true;
  }

}

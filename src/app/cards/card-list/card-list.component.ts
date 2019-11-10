import { Observable, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { CARDS } from '../mock-cards';
//import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cards$: Observable<Card[]>;
  cards = CARDS;
  selectedCard: Card;
  selectedId: number;

  constructor(private service: CardService, private route: ActivatedRoute) {
    //this.cards$ = service.getCards();
    //this.showCards();
    //console.log("maybe got some cards?");
  }

  ngOnInit() {
    this.getCardList();

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
  }

  addCard() {
    console.log("add card method");
  }

  getCardList(): void {
    this.service.getCards().subscribe(cards => this.cards$ = this.cards$);
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
    //CardComponent.displayThisCard(card);
  }


}


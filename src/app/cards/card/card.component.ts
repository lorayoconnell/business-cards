import { switchMap } from 'rxjs/operators'; // to process the observable route parameters
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { CardService } from '../card.service';
import { Card } from '../card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  card$: Observable<Card>;

  constructor(private route: ActivatedRoute, private router: Router, private service: CardService) { }

  ngOnInit() {
    this.card$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getCard(params.get('cardId')))
    );
  }


  gotoCards(card: Card) {
    let cId = card ? card.cardId : null;
    // pass along the card id if available so that
    // the CardList component can select that card
    this.router.navigate(['/cards', { cardId: cId, foo: 'foo' }]); // in case we want other paramaters passed
  }





}

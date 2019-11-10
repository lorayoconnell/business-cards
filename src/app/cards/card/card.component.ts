import { switchMap } from 'rxjs/operators'; // to process the observable route parameters
import { Component, OnInit, Input } from '@angular/core';
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

  @Input() card: Card;

  card$: Observable<Card>;

  constructor(private route: ActivatedRoute, private router: Router, private service: CardService) { }

  ngOnInit() {
    /*
    this.card$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getCard(params.get('cardId')))
    );
*/
  }

editCard(card: Card) {
  console.log("edit card method");
  // change the text fields to input fields to allow for updating
  // also show update button
  // also give big read button to delete the card
}


/*
  displayCard(card: Card) {
    this.card$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getCard(params.get('cardId')))
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
    let cId = card ? card.cardId : null;
    // pass along the card id if available so that
    // the CardList component can select that card
    this.router.navigate(['/cards', { cardId: cId, foo: 'foo' }]); // in case we want other paramaters passed
  }





}

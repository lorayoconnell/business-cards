import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from './card.model';
import { CARDS } from './mock-cards';

/*
@Injectable({
  providedIn: 'root'
})
*/

@Injectable()
export class CardService {

  constructor() { }



  getCards(): Observable<Card[]> {
    return of(CARDS);
  }

  getCard(cardId: string) {    // uid
    return this.getCards().pipe(

      // (+) before `id` turns the string into a number
      // is === ok to use to compare strings
      // card.cardId === +cardId))

      map((cards: Card[]) => cards.find(card => card.cardId === cardId)) 
    );
  }







}

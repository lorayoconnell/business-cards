import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from '../cards/card-list/card-list.component';
import { CardComponent } from '../cards/card/card.component';

const cardRoutes: Routes = [
  { path: 'cards', redirectTo: '/cardlist' },
  { path: 'card/:cardId', redirectTo: '/card/:cardId' },
  { path: 'cardlist', component: CardListComponent, data: { animation: 'cards' } },
  { path: 'card/:cardId', component: CardComponent, data: { animation: 'card' } }
];

@NgModule({
  imports: [RouterModule.forChild(cardRoutes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }

/*
contains a route parameter for cardId
url would look like: localhost:4200/card/123abc
*/

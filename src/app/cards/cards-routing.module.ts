import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from '../cards/card-list/card-list.component';
import { CardComponent } from '../cards/card/card.component';
import { NewCardComponent } from './new-card/new-card.component';
import { AuthGuard } from '../auth/auth.guard';

const cardRoutes: Routes = [
  { path: '', redirectTo: '/cardlist', pathMatch: 'full' },
  { path: 'cards', redirectTo: '/cardlist' },
 // { path: 'card/:cardId', redirectTo: '/card/:cardId' },
  { path: 'cardlist', component: CardListComponent, data: { animation: 'cards' }, canActivate: [AuthGuard] },
  { path: 'card/:id', component: CardComponent, data: { animation: 'card' }, canActivate: [AuthGuard] },
  { path: 'newcard', component: NewCardComponent, canActivate: [AuthGuard] }
  // need '**' ?
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

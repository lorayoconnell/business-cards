import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardComponent } from './new-card/new-card.component';
import { SearchCardComponent } from './search-card/search-card.component';


@NgModule({
  declarations: [CardComponent, CardListComponent, NewCardComponent, SearchCardComponent],
  imports: [
    CommonModule,
    CardsRoutingModule
  ]
})
export class CardsModule { }

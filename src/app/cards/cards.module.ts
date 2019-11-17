import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardComponent } from './new-card/new-card.component';
import { SearchCardComponent } from './search-card/search-card.component';

import { CardsRoutingModule } from './cards-routing.module';
import { CardService } from './card.service';
import { SearchCardService } from './search-card.service';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardsRoutingModule
  ],
  declarations: [
    CardComponent, 
    CardListComponent,
    NewCardComponent,
    SearchCardComponent
  ],
  providers: [
    CardService, 
    SearchCardService //, AngularFirestore
  ]
  
})
export class CardsModule { }

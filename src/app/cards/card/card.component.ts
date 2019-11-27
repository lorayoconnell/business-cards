import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  cardId: string;
  card$: Observable<Card>;
  cardCollectionRef: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router, private service: CardService) { }

  ngOnInit():void {
    this.getSelectedCard();
  }

  getSelectedCard() {
    this.card = new Card;
    this.card.id = this.route.snapshot.paramMap.get('id');
    if (this.card.id != null) {
      this.card = this.service.getCard(this.card);
      //if (this.card.cardImage == null) {
      //  this.card.cardImage = this.service.getDefaultCard();
      //}
    }
  }

  editCard() {
    document.getElementById("thisForm").classList.toggle("no_edit");
    document.getElementById("editBtn").classList.toggle("toggleBtnShow");
    document.getElementById("editBtn").classList.toggle("toggleBtnHide");
    document.getElementById("updateBtn").classList.toggle("toggleBtnHide");
    document.getElementById("updateBtn").classList.toggle("toggleBtnShow");
    document.getElementById("deleteBtn").classList.toggle("toggleBtnHide");
    document.getElementById("deleteBtn").classList.toggle("toggleBtnShow");
  }

  updateCard() {
    this.service.updateCard(this.card);
    this.router.navigate(['/cardlist']);
  }

  deleteCard() {
    this.service.deleteCard(this.card);
    this.router.navigate(['/cardlist']);
  }

  /**
   *  Route back to cardlist passing parameter of card id
   *  so that card can still be 'selected'
   *  uses matrix url notation (separated by semicolons), not standard url query string notation
   */
  gotoCards(card: Card) {
    let cId = card ? card.id : null;
    this.router.navigate(['/cards']);
  }


}


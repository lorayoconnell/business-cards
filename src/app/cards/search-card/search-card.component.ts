import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { SearchCardService } from '../search-card.service';
import { Card } from '../card.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {
  thisCard: Card;
  cardIds: string[];
  searchStr: string;

  constructor(private cardService: CardService, private searchCardService: SearchCardService) { }

  ngOnInit() {
    this.searchCardService.resetNoMatchMsg();
  }

  searchCards(userInput: HTMLInputElement) {
    this.searchStr = `${userInput.value}`;
    this.searchCardService.testSearchServ(this.searchStr);
  }

  closeViewSea() {
    this.searchCardService.closeViewSearch();
  }

  getNoMatch(): boolean {
    return this.searchCardService.noMatch;
  }

}

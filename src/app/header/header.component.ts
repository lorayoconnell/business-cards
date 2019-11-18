import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchCardService } from '../cards/search-card.service';
import { CardService } from '../cards/card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  str: string;
  searchStr: string;
  //showSearchField: boolean = false;


  constructor(private cardService: CardService, private authService: AuthService, private searchCardService: SearchCardService) { }

  ngOnInit() {
  }


  signedIn(): boolean {
    return this.authService.isSignedIn();
  }

  displayTest() {
    console.log("signed in: " + this.signedIn());
  }

  logOut() {
    this.authService.logout();
  }





  //getSearchBoolean():boolean {
    //return this.showSearchField;
  //}
  showSearch(): boolean {
    //console.log("clicked on showSearch: " + this.showSearchField);
    //this.showSearchField = true;
    //return this.showSearchField;
    return true;
  }





    /*
  searchCards(userInput: HTMLInputElement) {
    this.searchStr = `${userInput.value}`;

  }



  getArrayOfCardIds(userInput: HTMLInputElement) {   //String[] {
    //console.log("cardIds.length: " + this.cardIds.length);
    this.thisCard = new Card();

    
    
    this.searchCardService.getCardIdsArrayInSearch(this.cardIds, this.searchStr);
    
    //this.thisCard = this.afs.collection<Card>('cards').doc(this.cardIds[0]);




    //return this.cardIds;
  }



<input type="text" id="searchField" placeholder="search" #searchContent/>
<button (click)="getArrayOfCardIds(searchContent)">Search</button>
    */



    //console.log(`user input: `);
  //  this.str = `${userInput.value}`;

  //  this.searchCardService.searchCards(this.str);

    //this.cardService.getCardIdsArray();








}



/*
import { Component, OnInit } from '@angular/core';
//import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // userSignedIn: boolean;
  // loginComponent: LoginComponent;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("inside header.component.ts: isSignedIn: " + this.authService.signedIn);
  }



}

*/

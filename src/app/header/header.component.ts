import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchCardService } from '../cards/search-card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  str: string;

  constructor(private authService: AuthService, private searchCardService: SearchCardService) { }

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



  searchCards(userInput: HTMLInputElement) {

    //console.log(`user input: `);
    this.str = `${userInput.value}`;

    this.searchCardService.searchCards(this.str);

  }




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

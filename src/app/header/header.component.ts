import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchCardService } from '../cards/search-card.service';
import { CardService } from '../cards/card.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  str: string;
  searchStr: string;

  constructor(private cardService: CardService, private authService: AuthService,
    private searchService: SearchCardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  signedIn(): boolean {
    return this.authService.isSignedIn();
  }

  userSignedIn(): boolean {
    if (this.authService.isSignedIn())
      return true;
    else
      return false;
  }

  signOut(): void { // logout
    this.authService.logout();
  }
  
  gotoSearch() {
    this.searchService.updateViewSearch();
    this.router.navigateByUrl('/cardlist');
  }



}


/*


  showSearch(): boolean {
    return true;
  }

  displayTest() {
    console.log("signed in: " + this.signedIn());
  }

*/
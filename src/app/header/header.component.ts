import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

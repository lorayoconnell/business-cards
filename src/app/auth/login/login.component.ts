import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; // , NavigationExtras
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService, public router: Router) {
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.authService.login(
        formData.value.email,
        formData.value.password
      );
    }
  }

  loginGoogle() {
    this.authService.googleLogin();
  }


}









/*


//import { Subscription } from 'rxjs';

  ngOnDestroy(): void {
    //this.subscr.unsubscribe(); <--  this is causing a problem...
  } 

 //implements OnInit, OnDestroy {
  //subscr: Subscription;



  //logout() {
    //this.authService.loginn().unsubscribe();
    //this.authService.logout();
    //this.setMessage();
  //}


  //login() {
    //this.authService.signin();
  //}

    this.subscr = this.authService.loginn().subscribe(() => {
      console.log("SUBSCRIBING");
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';
        // Redirect the user
        this.router.navigateByUrl(redirect);  //, navigationExtras);
      }
    });




ngOnInit(): void {
  this.paramSub = this.authService.loginn().subscribe(() => {
    if (this.authService.isLoggedIn) {
      let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';
      this.router.navigateByUrl(redirect);
    }
  });
}




    this.paramSub = this.activeRoute.params.subscribe(params => {
      if (params['error'] && params['error'] == "1") { 
        this.hasError = true;
      }
    });




        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

*/





// from chat app:
/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hasError: boolean;
  private paramSub: any;
  showFields: boolean = false;

  constructor(fb: FormBuilder, private authService: AuthService, private activeRoute: ActivatedRoute) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.paramSub = this.activeRoute.params.subscribe(params => {
      if (params['error'] && params['error'] == "1") { 
        this.hasError = true;
      }
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  onSubmit(value: any): void {
    if (this.loginForm.valid) {
      this.authService.logIn(value.email, value.password);
    }
  }

  showLoginFields(b: boolean): void {
    this.showFields = b;
  }

  signedIn(): boolean {
    return !this.authService.isSignedIn();
  }
}
*/
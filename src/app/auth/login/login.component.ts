import { Component } from '@angular/core';
import { Router } from '@angular/router'; // , NavigationExtras
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }


  onSubmit(formData) {
    if (formData.valid) {
      this.authService.login(
        formData.value.email,
        formData.value.password
      );
    }
  }




  



  login() {
    this.message = 'Trying to log in ...';

    this.authService.loginn().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';

/*
        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
*/

        // Redirect the user
        this.router.navigateByUrl(redirect);  //, navigationExtras);
      }
    });




  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  loginGoogle() {
  //  this.authService.googleLogin();
  }


}


/*
// Set our navigation extras object
// that passes on our global query params and fragment
let navigationExtras: NavigationExtras = {
  queryParamsHandling: 'preserve',
  preserveFragment: true
};

// Redirect the user
this.router.navigateByUrl(redirect, navigationExtras);
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
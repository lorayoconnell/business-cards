import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  str: string;

  constructor(public authService: AuthService, private route: ActivatedRoute, public router: Router) { }

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

  resetPassword(userEmail) {

    if (userEmail.value) {

      //this.str = document.getElementById("userEmail").;
      //console.log("email: " + userEmail.value);
      if (this.authService.sendResetPasswordLink(userEmail.value)) {
        this.updateMessageSuccess("Email has been sent.");
      }
      else {
        this.updateMessageError("Something went wrong.<br>Email has not been sent.");
      }



    } else {
      this.updateMessageError("Please enter your email address.");
    }


  }

  updateMessageSuccess(msg: string) {
    document.getElementById("msg-cont").classList.add("msg-container-s");
    document.getElementById("msg").innerHTML = msg;
  }

  updateMessageError(msg: string) {
    document.getElementById("msg-cont").classList.add("msg-container-e");
    document.getElementById("msg").innerHTML = msg;
  }


}







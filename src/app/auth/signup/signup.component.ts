import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log("this is where account creation needs to happen");
/*
      this.authService.createAccount(
        formData.value.email,
        formData.value.password
      );
*/

    }
  }


}









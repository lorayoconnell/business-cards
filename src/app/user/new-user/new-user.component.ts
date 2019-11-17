import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService) { } // need router?

  ngOnInit() { }

  onSubmit(formData) {
    //this.userService.createUser(this.user);
    //this.user = new User();
  }

}

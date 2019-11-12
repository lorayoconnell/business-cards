import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {

  card: Card = new Card();

  constructor(private cardService: CardService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  save() {

    console.log("new-card.component.ts save()");

    this.cardService.createCard(this.card);
    this.card = new Card();

    // and route back to list
    this.router.navigateByUrl('/cardlist');



    //this.todoService.createTodoItem(this.todoItem);
    //this.todoItem = new TodoItem();

  }

  onSubmit(formData) {
    console.log("new-card.component.ts onSubmit()");
    //this.card.userId = this.userService.getUserId();

    

    this.cardService.createCard(this.card);
    this.card = new Card();
    this.router.navigateByUrl('/cardlist');
  }


/*
  onSubmit(formData) {
    if (formData.valid) {
      this.authService.login(
        formData.value.email,
        formData.value.password
      );
    }
  }
*/


}

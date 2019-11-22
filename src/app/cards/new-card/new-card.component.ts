import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {

  @Input() cardScan: Card;
  card: Card = new Card();
  scan: Card = new Card();

  constructor(private cardService: CardService, private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getScanData();
  }

  getScanData() {
    var par = this.route.snapshot.paramMap.get('par');
    if (par != null) {
      this.goGetScanData();
    }
    else {
      console.log("no scan data here");
    }
  }

  goGetScanData() {
    this.card = new Card();
    this.card = this.cardService.getCardInfoFromScan();
  }

  //getInfoFromScan(c: Card) {
    //console.log("getInfoFromScan");
    //this.scan = new Card();
//    this.scan = this.cardService.getCardInfoFromScan();
    //console.log("inside of new card: " + c.toString());
  //}

  save() {
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

}

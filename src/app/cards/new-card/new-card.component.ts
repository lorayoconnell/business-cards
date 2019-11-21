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
    console.log("getScanData");
    var par = this.route.snapshot.paramMap.get('par');
    if (par != null) {
      console.log("We've got scan data to get");
      this.goGetScanData();
    }
    else {
      console.log("no scan data here");
    }
  }



  goGetScanData() {
    console.log("goGetScanData...");
    this.card = new Card();
    this.card = this.cardService.getCardInfoFromScan();
    console.log("this.scan: " + this.card.toString());






  }



/*

  @Input() card: Card;
  cardId: string;
  card$: Observable<Card>;
  cardCollectionRef: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router, private service: CardService) { }

  ngOnInit():void {
    //this.setReadOnly("false");
    this.getSelectedCard();
  }

  getSelectedCard() {
    this.card = new Card;
    this.card.id = this.route.snapshot.paramMap.get('id');
    if (this.card.id != null) {
      this.card = this.service.getCard(this.card);
    }
  }

  editCard() {
    document.getElementById("thisForm").classList.toggle("no_edit");
    document.getElementById("editBtn").classList.toggle("toggleBtnShow");
    document.getElementById("editBtn").classList.toggle("toggleBtnHide");
    document.getElementById("updateBtn").classList.toggle("toggleBtnHide");
    document.getElementById("updateBtn").classList.toggle("toggleBtnShow");
    document.getElementById("deleteBtn").classList.toggle("toggleBtnHide");
    document.getElementById("deleteBtn").classList.toggle("toggleBtnShow");
  }

*/

  getInfoFromScan(c: Card) {
    console.log("getInfoFromScan");
    //this.scan = new Card();
//    this.scan = this.cardService.getCardInfoFromScan();

    console.log("inside of new card: " + c.toString());

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

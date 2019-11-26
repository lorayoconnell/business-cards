import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {

  @Input() cardScan: Card;
  card: Card = new Card();
  scan: Card = new Card();

  constructor(private cardService: CardService, private route: ActivatedRoute,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getScanData();
  }

  getScanData() {

// clear form
//document.getElementById("myForm").reset();

    var par = this.route.snapshot.paramMap.get('par');
    if (par != null) {
      this.card = new Card();
      this.card = this.cardService.getCardInfoFromScan();
      console.log("this.card: " + this.card);
      document.getElementById("cardImg").setAttribute( "src" , this.card.cardImage );
    }
    else {
      console.log("no scan data");
      document.getElementById("cardImg").setAttribute( "style" , "display:none" );
    }
  }

  clearForm(formData) {   /******* THIS DOESN'T WORK *******/
    formData.resetForm();
    /*
    var arr = document.getElementsByTagName("input");
    console.log("arr.length: " + arr.length); // 8
    var arr2 = document.getElementsByTagName("textarea");
    for (var i=0; i<arr.length; i++) {
      arr[i].value = "";
    }
    arr2[0].value = "";
    */
  }

  onSubmit(formData) {

    if (this.card.cardImage = null) {
      this.card.cardImage = this.cardService.getDefaultCard();
    }

    if (formData.valid) {
    console.log("new-card.component.ts onSubmit()");
    this.cardService.createCardForUser(this.card);
    this.card = new Card();
    this.clearForm(formData);
    this.router.navigateByUrl('/cardlist');
    }

  }

}

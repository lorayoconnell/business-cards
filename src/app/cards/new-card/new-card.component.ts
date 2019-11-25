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

  constructor(private cardService: CardService, private route: ActivatedRoute,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getScanData();
  }

  getScanData() {
    var par = this.route.snapshot.paramMap.get('par');
    if (par != null) {
      //this.goGetScanData();
      
      this.card = new Card();
      this.card = this.cardService.getCardInfoFromScan();
      console.log("this.card: " + this.card);

      /*
      var img = new Image();
      img.src = this.card.cardImage;
      document.getElementById("cardImg").appendChild(img);
      */
      //this.imageUrl = "<img height='50' src='" + base64img + "'>";


      document.getElementById("cardImg").setAttribute( "src" , this.card.cardImage );


    }
    else {
      console.log("no scan data here");
    }
  }

  onSubmit(formData) {
    if (formData.valid) {
    console.log("new-card.component.ts onSubmit()");

   //this.cardService.createCard(this.card);
   this.cardService.createCardForUser(this.card);

    this.card = new Card();
    this.router.navigateByUrl('/cardlist');
    }
  }










}





  //goGetScanData() {
  //  this.card = new Card();
  //  this.card = this.cardService.getCardInfoFromScan();
  //}

  //getInfoFromScan(c: Card) {
    //console.log("getInfoFromScan");
    //this.scan = new Card();
//    this.scan = this.cardService.getCardInfoFromScan();
    //console.log("inside of new card: " + c.toString());
  //}
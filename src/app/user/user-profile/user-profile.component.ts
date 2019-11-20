import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { CardService } from 'src/app/cards/card.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;
  userId: string;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private cardService: CardService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    console.log("Getting current user profile information");
    this.user = new User;
    this.user.userId = this.afAuth.auth.currentUser.uid;
    this.user = this.userService.getUser(this.user);
    this.userService.displayUserInfoOnConsole(this.user);
  }

  onSubmit(formData) {
    console.log("onSubmit: updating user data");
    this.userService.updateUser(this.user);
  }

}







/*

    this.cardService.createCard(this.card);
    this.card = new Card();
    this.router.navigateByUrl('/cardlist');
  




export class CardComponent implements OnInit {

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

*/
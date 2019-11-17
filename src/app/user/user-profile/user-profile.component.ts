import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;
  userId: string;
  userEmail: string;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = new User;
    this.user.userId = this.afAuth.auth.currentUser.uid;
    this.user = this.userService.getUser(this.user);

    //this.user.userEmail = this.afAuth.auth.currentUser.email;

  }

}

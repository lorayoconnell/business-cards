import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }




  getUserEmail(): string {
    return this.afAuth.auth.currentUser.email;
  }


  getUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }



}

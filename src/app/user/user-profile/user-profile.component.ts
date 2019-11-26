import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { CardService } from 'src/app/cards/card.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;
  userId: string;
  conf: number;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private authService: AuthService, private cardService: CardService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.conf = 0;
    console.log("Getting current user profile information");
    this.user = new User;
    this.user.userId = this.afAuth.auth.currentUser.uid;
    console.log("user id is: " + this.user.userId);

    /*
    var docRef = this.afs.collection("users").doc(this.user.userId);
    docRef.snapshotChanges().subscribe(
      res => {
        this.user.firstName = res.payload.get('firstName');
        this.user.lastName = res.payload.get('lastName');
      }
    )
*/

   this.user = this.userService.getUser(this.user);
   this.user.email = this.userService.getUserEmail();

    //this.userService.displayUserInfoOnConsole(this.user);
  }

  onSubmit(formData) {
    console.log("onSubmit");
    try {
      this.user.firstName = formData.value.firstName;
      this.user.lastName = formData.value.lastName;
      this.user.email = formData.value.email;
      this.userService.updateUser(this.user);
      this.updateMessageSuccess("Account has been updated.");
    }
    catch (Error) {
      this.updateMessageError("Something has gone wrong.")
    }
  }

  deleteUserAccount() {
    console.log("deleteUserAccount");
    if (this.conf == 0) {
      this.updateMessageError("Are you sure? This is not reversible.");
      this.conf++;
    }
    else {  // the account deletes, but console still has permission error messages - observable...?
      this.afAuth.auth.currentUser.delete().then(function() {
        this.updateMessageSuccess("User account has been deleted.");
        this.router.navigateByUrl('/login');
      })
      .catch(function(error) {
        this.updateMessageError("There was a problem deleting your account.");
        console.log("Error: " + error);
      });
    }
  }

  updateMessageSuccess(msg: string) {
    document.getElementById("msg-cont").classList.add("msg-container-s");
    document.getElementById("msg").innerHTML = msg;
  }

  updateMessageError(msg: string) {
    document.getElementById("msg-cont").classList.add("msg-container-e");
    document.getElementById("msg").innerHTML = msg;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  


  }

}



/*
https://stackoverflow.com/questions/54002758/how-to-get-an-observable-for-data-from-firestore-query-in-angular-7

// Query the users by a specific email and return the first User with ID added    
return this.firestore.collection<User>('users', ref => ref.where('email', 
'==', email))
  .snapshotChanges()
  .pipe(map(users => {
    const user = users[0];
    if (user) {
      const data = user.payload.doc.data() as User;
      const id = user.payload.doc.id;
      return { id, ...data };
    }
    else {
      return null;
    }
  }));
In your Component code you can call this by

checkEmail() {
this.user$ = this.us.getUserByEmail('email@gmail.com')
  .pipe(
    tap(user => {
      if (user) {
        this.msg = 'success';
      } else {
        this.msg = 'User with this email does not exist!';
      }
    }));
}

*/
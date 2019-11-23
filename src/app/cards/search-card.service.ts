import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Card } from './card.model';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { CardService } from './card.service';
//import { query } from '@angular/animations';
//import { Router, ActivatedRoute } from '@angular/router';
//import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class SearchCardService {

  viewSearch: boolean = false;
  noMatch: boolean = false; // when true, display error message to user

  firstSearch: boolean;
  cardCollectionRef: AngularFirestoreCollection<Card>;
  card$: Observable<Card[]>;
  cardId: string[];
  card: Card;
  cardIdArr: string[];
  companyArr: string[];
  firstNameArr: string[];
  lastNameArr: string[];

  constructor(private afs: AngularFirestore, private cardService: CardService) {
    this.firstSearch = true;
  }

  // document reference points to a single card
  getSingleCard(cardId: string): AngularFirestoreDocument {
    var documentReference = this.afs.collection('cards').doc(cardId);
    return documentReference;
  }

  getCard(cardId: string) {
    var documentReference = this.afs.collection('cards').doc(cardId);
    documentReference.get().toPromise().then(function(documentSnapshot) {
      if (documentSnapshot.exists) {
        console.log("Document has been found");
        var data = documentSnapshot.data();

/*
        right now just returns the first match
        display a list of matches? or just select first match and go to card view
*/

      }
      else {
        console.log("Document not found"); // create message to display to screen
      }
    })

  }


  updateViewSearch() {
    this.viewSearch = true;
  }

  viewSearchPanel(): boolean {
    return this.viewSearch;
  }

  closeViewSearch() {
    this.viewSearch = false;
  }

  printAllCardIdsToConsole() {
    this.afs.collection("cards").get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id);
      });
    });
  }

  getArrayOfCardIds() {
    this.cardIdArr = new Array();
    this.afs.collection("cards").get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.cardIdArr.push(doc.id.toString());
      })
    }).then( res => {
      this.updateArr(this.cardIdArr);
    })
  }
  updateArr(st: string[]) {
    console.log("array: " + st);
  }

  testSearchServ(searchTerm: string) {
    console.log("inside search-card.service.ts * searchTerm: " + searchTerm);
    //this.getArrayOfCardIds();
    this.createParallelSearchArrays(searchTerm);
  }

  createParallelSearchArrays(searchTerm: string) {
    console.log("firstSearch? " + this.firstSearch);
    if (this.firstSearch) {
      this.cardIdArr = new Array();
      this.firstNameArr = new Array();
      this.lastNameArr = new Array();
      this.companyArr = new Array();

      this.afs.collection("cards").get().toPromise().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.cardIdArr.push(doc.id.toString());
          this.firstNameArr.push(doc.get('firstName'));   // || null?
          this.lastNameArr.push(doc.get('lastName'));
          this.companyArr.push(doc.get('organizationName'));
        })
  /*    }).then( res => {
        this.updateArr(this.cardIdArr);
        this.getFnArr(this.firstNameArr);
        this.getLnArr(this.lastNameArr);
        this.getCompArr(this.companyArr); */
      }).then(res => {
        this.gatherAllArrays(this.cardIdArr, this.firstNameArr, this.lastNameArr, this.companyArr, searchTerm);
      })
    }
    else {
      this.gatherAllArrays(this.cardIdArr, this.firstNameArr, this.lastNameArr, this.companyArr, searchTerm);
    }
  }

  gatherAllArrays(id:string[], fn:string[], ln:string[], org:string[], searchTerm:string) {

    //console.log("searchTerm: " + searchTerm + " id.length: " + id.length + " fn.length: "
    //            + fn.length + " ln.length: " + fn.length + " org.length: " + org.length);

    var arrLen = id.length;
    if ((arrLen != fn.length) || (arrLen != ln.length) || (arrLen != org.length) ) {
      console.log("there is an error... all arrays should be the same length");
    }

    var result = -1;
    result = this.searchStringInArray(searchTerm, org);
    if (result < 0) { // keep searching
      result = this.searchStringInArray(searchTerm, ln);
    }
    if (result < 0) { // keep searching
      result = this.searchStringInArray(searchTerm, fn);
    }

    if (result < 0) { // no matches
      // no match was found in company name, firstName, or lastName
      console.log("no match");
      this.noMatch = true;
    }
    else { // match has been found. result = index of match.
      this.displayMatch(id[result]);
    }

    this.firstSearch = false;
  }

  /**
   *  Returns -1 if not found or index of match if found
   */
  searchStringInArray(str:string, arr:string[]): number {
    var result = -1;
    str = str.toLowerCase();
    var len = arr.length;
    for (var i=0; i<len; i++) {
      if ((arr[i].toLowerCase()).indexOf(str) >= 0) {
        result = i;
      }
    }
    return result;
  }

  displayMatch(cardId: string) {
    console.log("match in cardId: " + cardId);
    this.cardService.showCard(cardId);
    this.getCard(cardId);
  }

  resetNoMatchMsg() {
    this.noMatch = false;
  }

}



  //searchCards(userInput: string) {

    // article about querying a collection:
    // https://medium.com/@scarygami/cloud-firestore-quicktip-documentsnapshot-vs-querysnapshot-70aef6d57ab3

    // var collectionReference = this.afs.collection<Card>('cards');
    // var query = collectionReference.doc().collection('lastName', '==', 'blah'); // .where('lastName', '==', 'something');

    // var query = collectionReference.where()


  //}




/*
    var docRef = this.afs.collection("cards");

    this.afs.collection("cards").where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
*/


/*
https://firebase.google.com/docs/firestore/solutions/search
suggests a third-party search service: Algolia

since this is a fairly small app,
I'll just search manually.....
*/



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
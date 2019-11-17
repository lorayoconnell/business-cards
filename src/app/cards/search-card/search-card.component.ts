import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }



  searchCards() {

    var searchField = document.getElementById("searchField");

    console.log("1: " + searchField.textContent);
    console.log("2: " + searchField.innerHTML);
    console.log("3: " + searchField.innerText);

  }



}




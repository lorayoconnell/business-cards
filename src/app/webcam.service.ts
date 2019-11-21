import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from './cards/card.model';
import { environment } from '../environments/environment';
import { CardService } from './cards/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';

const apikey = environment.cloudVision.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  apiUrl: string;
  card: Card;

  constructor(private cardService: CardService, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.card = new Card();
    this.card.displayName = "na";
    this.card.firstName = "na";
    this.card.lastName = "na";
    this.card.organizationName = "na";
    this.card.phone = "na";
    this.card.fax = "na";
    this.card.email = "na";
    this.card.additionalInfo = "na";
    this.card.cardImage = "na";
    this.apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apikey}`;
  }

  sendToCloudVision(base64img: string) {
    var request = {
      "requests": [ {
          "image": { "content": base64img },
          "features": [ { "type": "TEXT_DETECTION" }, { "type": "CROP_HINTS" } ],
          "imageContext": {
            "cropHintsParams": {
              "aspectRatios": [1.8]
            }
          }
        } ]
    };

    this.httpClient.post(this.apiUrl, request).subscribe( (results: any) => {
      var res = JSON.stringify(results, null, 0);
      var obj = JSON.parse(res);
      var obj2 = obj.responses[0];
      var obj3 = obj2.fullTextAnnotation.text;
      this.convertToCardData(obj3);
    });
  }
  
  convertToCardData(data: string) {
    console.log(data);
    var res = data.split('\n');
    var n = res.length;
    console.log("Number of pieces of data retrieved from card: " + n);

    for (var i=0; i<n; i++) {
      if (this.checkForFax(res[i])) {
        console.log("~~~~~~~~~~~~~~ fax number: " + res[i]);
        this.card.fax = res[i];
      }
      else if (this.validatePhoneNumber(res[i])) {
        console.log("~~~~~~~~~~~~~~ phone number: " + res[i]);
        this.card.phone = res[i];
      }
      else if (this.validateEmail(res[i])) {
        console.log("~~~~~~~~~~~~~~ email address: " + res[i]);
        this.card.email = res[i];
      }


      //else if (this.validateAllLetters(res[i])) {
      //  console.log("this piece of info has all letters: " + res[i]);
        // what could I be
      //}


      else {
        console.log("numbers and letters... what could I be: " + res[i]);
        this.card.additionalInfo += (res[i] + '\t');
      }

    }
    this.processCardData();
  }

  checkForFax(val): boolean {
    val = val.toLowerCase();
    if (val.includes("fax")) {
      val = val.replace('fax', '');
      val = val.trim();
      if (this.validatePhoneNumber(val)) {
        return true;
      }
    }
  }

  validatePhoneNumber(val): boolean {
    val = val.toLowerCase();
    if ( (val.includes("phone")) || (val.includes("ph")) ) {
      val = val.replace('phone', '');
      val = val.replace('ph.', '');
      val = val.replace('ph', '');
      val = val.trim();
    }
    var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(val);
  }

  validateEmail(val): boolean {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(val);
  }


  // all letters & allow apostrophe
  validateAllLetters(val) {
    var letterPattern = /^[A-Za-z\'\s\,\.]+$/;
    return letterPattern.test(val);
      // if(inputtxt.value.match(letters)) { return true; }
      // else { return false; }
  }

  // put everything leftover into the 'additional info' section
  // maybe make each piece of info into a draggable box to add to the appropriate section


  processCardData() {

    console.log("processCardData");

    this.cardService.getWebcamInfo(this.card);



    

    //this.cardService.createCard(this.card);

    //let cId = this.card ? this.card.id : null;  // is it too early to get this....?
    //this.router.navigate(['/cards', { id: cId, foo: 'foo' }]); // in case we want other paramaters passed
  
  }



  



}


/*

checkForCityState(val) {
    var split = val.split(" ");
    var num = split.length;
    if (num > 1) {
      for (var i=0; i<num; i++) {
        if (stateNames.includes(split[i])) {
          // flag as state
        }
        else if (stateAbbreviations.includes(split[i])) {
          // flag as state
        }
      }
    }
  }
*/

  /*

  */





/*
check(str) {

      var len = str.length;
      var c;
      var nums = 0;
    
      for (var i=0; i<len; i++) {
        c = str.charAt(i);
        if (isNaN(parseInt(c))) {
          console.log("NaN c: " + c + " parseInt(c): " + parseInt(c));
          
        }
        else {
          console.log("number c: " + c + " parseInt(c): " + parseInt(c));
          nums++;
        }
    
      }
      console.log("number of nums: " + nums + " other: " + (len-nums));
    
    // nums = 5 => zipcode
    // nums = 7 => phone num without area code
    // nums = 9 => zipcode with 4 digit suffix
    // nums = 10 => phone num with area code
    
    }
    */





/*
  checkNumbers(str) {
      var len = str.length;
      var type = "";
      
      if (str.indexOf("-") > -1) {
        if ((len == 10) && (str.indexOf("-")==5)) {
          type = "zipcode";
        }
      }
      
      if ((str.indexOf("(") > -1) && (str.indexOf(")") > -1)) {
        var ac = "";
        var i1 = str.indexOf("(");
        var i2 = str.indexOf(")");
        console.log("i1: " + i1 + " i2: " + i2);
    
        if ((i2 - i1 == 4) && (str.substring(i2+1).trim().length == 8)) {	//	(***)***-****
          ac = str.substring(i1+1,i2);
          console.log("this is an area code: " + ac);
          console.log("rest of phone number: " + str.substring(i2+1));
        }
      }
    
      else {
        if (len == 5) {
          type = "zipcode";
        }
      }
      console.log("str: " + str + " length: " + len + " type: " + type);
      console.log("******************************************");
    }
*/





/*
data: 
All Ages
All Breeds
Expert Witness
8asic&Advanced
Obedience
GUY YEAMAN
Professional Dog Trainer
Garnerville NV
Ph (775) 265-4530
Fax (775) 265-3740
Reasonable Rales
www.dogmanguy com
*/



/*
<div class="ui selection dropdown">
  <input type="hidden" name="gender">
  <i class="dropdown icon"></i>
  <div class="default text">Gender</div>
  <div class="menu">
    <div class="item" data-value="1">Male</div>
    <div class="item" data-value="0">Female</div>
  </div>
</div>
*/



  //cardOCR(input: any) {
    //this.httpClient.post(this.apiUrl, input).get('res', '0', 'textAnnotations').subscribe(
  //}

    
    // apiUrl
    // data: JSON.stringify(request)
    // contentType: 'application/json'

    /*
    $('#results').text('Loading...');
    
    $.post({
      url: CV_TARGET,
      data: JSON.stringify(request),
      contentType: 'application/json'
    }).fail(function(jqXHR, textStatus, errorThrown) {
      $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
    }).done(displayJSON);


  displayJSON(data) {
    var contents = JSON.stringify(data, null, 4);
    //$("#results").text(contents);
  }


*/








/*
50 states + American Samoa (AS) + District of Columbia (DC) +
  Federated States Of Micronesia (FM) + Guam (GU) + Marshall Islands (MH) +
  Northern Mariana Islands (MP) + Palau (PW)+ Puerto Rico (PR) + Virgin Islands (VI) = 59
*/

const stateAbbreviations = [
  'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
  'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
  'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
  'VT','VI','VA','WA','WV','WI','WY'
 ];
 
 const stateNames =
 ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado',
 'Connecticut','Delaware','District of Columbia','Federated States of Micronesia',
 'Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas',
 'Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan',
 'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
 'New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands',
 'Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina',
 'South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington',
 'West Virginia','Wisconsin','Wyoming'];





// already used
 /*
  demo() {
    var data = "All Ages\nAll Breeds\nExpert Witness\n8asic&Advanced\nObedience\nGUY YEAMAN\nProfessional Dog Trainer\nGarnerville NV\nPh (775) 265-4530\nFax (775) 265-3740\nReasonable Rales\nwww.dogmanguy com";
    document.write(data);
    var res = data.split('\n');
    var n = res.length;
    console.log("n: " + n);
    for (var i=0; i<n; i++) {
      console.log("** " + res[i]);
      if (this.checkForFax(res[i])) {console.log("~~~~~~~~ fax number: " + res[i]);}
      else if (this.validatePhoneNumber(res[i])) {console.log("~~~~~~~~ phone number: " + res[i]);}
      else if (this.validateEmail(res[i])) {console.log("~~~~~~~~~ email: " + res[i]);}
      else if ()
    }
  }
  const parsedImage = dataURL.replace('data:image\/png;base64,', '');

  checkForFax(val): boolean {
    if ((val.toLowerCase().includes("fax")) {
      val = val.replace(/fax/gi, "");
      val = val.trim();
      if (this.validatePhoneNumber(val)) return true; }
  }
  validatePhoneNumber(val): boolean{
    if ( (val.toLowerCase().includes("phone")) || (val.toLowerCase().includes("ph")) ) {
      val = val.replace(/phone/gi, "");
      val = val.replace(/ph/gi, "");
      val = val.trim();
    }
    var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(val);
  }
  validateEmail(val): boolean {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(val);
  }
*/

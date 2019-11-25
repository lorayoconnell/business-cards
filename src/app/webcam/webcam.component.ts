import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { CardService } from '../cards/card.service';
import { WebcamService } from '../webcam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';

//import { WebcamImage } from 'ngx-webcam';
//import { WebcamInitError, WebcamUtil} from 'ngx-webcam';
//import {Subject} from 'rxjs';
//import {Observable} from 'rxjs';
//declare var require: any;
//import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  //public webcamImage: WebcamImage = null;
  //thisimg;
  //thisone: string;
  //base64: string;
  //bbase64: string;
  //imageUrl;

  base64img: string;


   @ViewChild("video", {static:false})
   public video: ElementRef;
 
   @ViewChild("canvas", {static:false})
   public canvas: ElementRef;
 
   //public captures: Array<any>;  // an array of imgs in case combine several for better resolution/accuracy
   
   public constructor(private cardService: CardService, private webcamService: WebcamService,
     private route: ActivatedRoute, private router: Router, private storageService: StorageService ) {
     //this.captures = [];
   }
 
   public ngOnInit() { }

   public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
        });
    }
  }

  public cancel() {
    this.router.navigateByUrl('/cardlist');
    this.stopCamera();
  }

  public capture() {

    var context = this.canvas.nativeElement.getContext("2d")
        .drawImage(this.video.nativeElement, 160, 140, 320, 200, 0,0, 640, 480); // first 4 are the section to capture, second 4 are the dimensions of the new img
//    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    this.base64img = this.canvas.nativeElement.toDataURL();
    this.webcamService.testThisBullshit(this.base64img);
    this.stopCamera();
  }

  public stopCamera() {
    this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop());
  }

}
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { CardService } from '../cards/card.service';
import { WebcamService } from '../webcam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  base64img: string;

  @ViewChild("video", {static:false})
  public video: ElementRef;
 
  @ViewChild("canvas", {static:false})
  public canvas: ElementRef;
 
  public constructor(private cardService: CardService, private webcamService: WebcamService,
    private route: ActivatedRoute, private router: Router ) {
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
        .drawImage(this.video.nativeElement, 48,60,520,288,0,0,640,356);
        // first 4 are the section to capture, second 4 are the dimensions of the new img
    this.base64img = this.canvas.nativeElement.toDataURL();
    this.webcamService.testThis(this.base64img);
    this.stopCamera();
  }

  public stopCamera() {
    this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop());
  }

}
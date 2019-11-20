import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  @ViewChild("video", {static:false})
  public video: ElementRef;

  @ViewChild("canvas", {static:false})
  public canvas: ElementRef;

  public captures: Array<any>;

  public constructor() {
    this.captures = [];
  }

  public ngOnInit() { }

  /*
  When we're sure that the view elements have initialized, we can do some tasks via the
  ngAfterViewInit method. Essentially, we're asking for permission to use the webcam,
  and we're showing the stream from the webcam in the <video> element.
  */
  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            //this.video.nativeElement.src = window.URL.createObjectURL(stream);
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
        });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d")
        .drawImage(this.video.nativeElement, 160, 140, 320, 200, 0,0, 640, 480); // first 4 are the section to capture, second 4 are the dimensions of the new img
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    var dataURL = this.canvas.nativeElement.toDataURL();
    // console.log("dataURL: " + dataURL);
    this.processImage(dataURL);
  }

  public processImage(dataURL) {
  
  
    console.log("dataURL: " + dataURL);
  

    // api requires base64 image header to be removed:
    // const parsedImage = this.mybase64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ‘’);
  
    
  }




  public stopCamera() {
    this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop());
  }



}

/*
local variables from the HTML:
By using @ViewChild with the variable name, we can
load the elements into the variable that follows.
@ViewChild("video", {static:false})
public video: ElementRef;
*/

/*
https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL

var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
// data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
*/


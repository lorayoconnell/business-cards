import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { CardService } from '../cards/card.service';
// import { environment } from '../../environments/environment';
import { WebcamService } from '../webcam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { WebcamImage } from 'ngx-webcam';


//const vision = require('@google-cloud/vision');
//const client = new vision.ImageAnnotatorClient();

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {


@Output() public imageCapture: EventEmitter<WebcamImage> = new EventEmitter<WebcamImage>();


//webcamImg: WebcamImage;



  @ViewChild("video", {static:false})
  public video: ElementRef;
 // public webcamImg: WebcamImage = null;
 // imageUrl;

  @ViewChild("canvas", {static:false})
  public canvas: ElementRef;

  public captures: Array<any>;  // an array of imgs in case combine several for better resolution/accuracy
  base64img: string;

  public constructor(private cardService: CardService, private webcamService: WebcamService,
    private route: ActivatedRoute, private router: Router, private storageService: StorageService ) {
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

public cancel() {
  this.router.navigateByUrl('/cardlist');
  this.stopCamera();
}

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d")
        .drawImage(this.video.nativeElement, 160, 140, 320, 200, 0,0, 640, 480); // first 4 are the section to capture, second 4 are the dimensions of the new img
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));



    //var dataURL = this.canvas.nativeElement.toDataURL();
    //this.processImage(dataURL);
    //this.storageService.uploadFile(this.canvas.nativeElement.toDataURL("image/png"));
    this.base64img = this.canvas.nativeElement.toDataURL();
    this.processImage(this.base64img);


/*
    let imageData: ImageData = null;
    imageData = context.getImageData(0, 0,640, 480);
    this.webcamImg = new WebcamImage(this.base64img, 'image/jpeg', imageData);
    this.saveImage(this.webcamImg);
*/
// 3 arguments: dataUrl, mimeType, imageData
// dataUrl: string = canvas.toDataURL(mimeType, quality);
// mimeType: string = 'image/jpeg'
// quality: number = 0.92
// imageData: context2d.getImageData(0,0,canvaswidth,canvasheight)



/*
    // paint snapshot image to canvas
    const context2d = _canvas.getContext('2d');
    context2d.drawImage(_video, 0, 0);

    // read canvas content as image
    const mimeType: string = 'image/jpeg';
    const quality: number =  0.92;
    const dataUrl: string = _canvas.toDataURL(mimeType, quality);

    // get the ImageData object from the canvas' context.
    let imageData: ImageData = null;

    //if (this.captureImageData) {
    imageData = context2d.getImageData(0, 0, _canvas.width, _canvas.height);
    //}

    // this.imageCapture.next(new WebcamImage(dataUrl, mimeType, imageData));

    //this.imageCapture = 
    this.webcamImg = new WebcamImage(dataUrl, mimeType, imageData);



    const mimeType: string = 'image/jpeg';
    const quality: number =  0.92;
    const dataUrl: string = this.base64img;
    this.webcamImg = new WebcamImage(dataUrl, mimeType, context);
    this.saveImage(this.webcamImg);
*/



    this.stopCamera();
  }


// **********************************************
/*
  public saveImage(webcamImg: WebcamImage) {
    this.webcamImg = webcamImg;
    this.imageUrl = webcamImg.imageAsDataUrl;
    console.log("this.imageUrl: " + this.imageUrl);
  }
*/


  public processImage(dataURL) {
    //console.log("dataURL: " + dataURL);
    // api requires base64 image header to be removed:
    //const parsedImage = this.mybase64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ‘’);
    const parsedImage = dataURL.replace('data:image\/png;base64,', '');
    //console.log("parsedImage: " + parsedImage);
    this.webcamService.sendToCloudVision(parsedImage);
  }

  public stopCamera() {
    this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop());
  }

  testingStuff() {
      // "requests": [ { "image": { "content": "base64-encoded image" }, "features": [ { "type": "TEXT_DETECTION" } ] } ]
  }











  /**
   * Takes a snapshot of the current webcam's view and emits the image as an event
 
  public takeSnapshot(): void {
    const _video = this.video.nativeElement;  // nativeVideoElement;
    const dimensions = {width: 640, height: 480};
    if (_video.videoWidth) {
      dimensions.width = _video.videoWidth;
      dimensions.height = _video.videoHeight;
    }

    const _canvas = this.canvas.nativeElement;
    _canvas.width = dimensions.width;
    _canvas.height = dimensions.height;




    // paint snapshot image to canvas
    const context2d = _canvas.getContext('2d');
    context2d.drawImage(_video, 0, 0);

    // read canvas content as image
    const mimeType: string = 'image/jpeg';
    const quality: number =  0.92;
    const dataUrl: string = _canvas.toDataURL(mimeType, quality);

    // get the ImageData object from the canvas' context.
    let imageData: ImageData = null;

    //if (this.captureImageData) {
    imageData = context2d.getImageData(0, 0, _canvas.width, _canvas.height);
    //}

    // this.imageCapture.next(new WebcamImage(dataUrl, mimeType, imageData));

    //this.imageCapture = 
    this.webcamImg = new WebcamImage(dataUrl, mimeType, imageData);

  }

  */
























}


/*
const request = {
  image: {
    source: {imageUri: 'gs://path/to/image.jpg'}
  }
};
client
  .textDetection(request)
  .then(response => {
    // doThingsWith(response);
  })
  .catch(err => {
    console.error(err);
  });
*/





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


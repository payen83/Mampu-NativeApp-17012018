import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  myImage: any;

  constructor(public socialSharing: SocialSharing, public camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  shareFB(){
    // Share via email
    this.socialSharing.shareViaInstagram('Rajin abang rajin..', this.myImage).then(() => {
      // Success!
    }).catch((err) => {
      // Error!
      alert('Unable to share via facebook: ' + JSON.stringify(err));
    });
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      targetWidth: 600
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    //let base64Image = imageData;
     this.myImage = imageData;
    }, (err) => {
     // Handle error 
     alert('error: ' + JSON.stringify(err))
    });
  }

}

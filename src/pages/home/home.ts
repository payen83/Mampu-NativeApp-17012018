import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public geolocation: Geolocation, public navCtrl: NavController) {

  }

  ionViewDidLoad(){

    let options: GeolocationOptions = {
      timeout: 10000
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('Latitude: ' + resp.coords.latitude);
      console.log('Longitude: ' + resp.coords.longitude);
      this.initMap(resp.coords.latitude, resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.initMap(2.9993472, 101.6783672);
     });

    
  }

  initMap(lat: number, lng: number){

    let center = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let content = 'Your current location';
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
    });
  }

}

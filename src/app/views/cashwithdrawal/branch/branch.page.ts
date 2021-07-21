import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { BranchDataService } from './branch.service';
import { MapsService } from './maps.service';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.page.html',
  styleUrls: ['./branch.page.scss'],
})
export class BranchPage implements OnInit {
  google;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  selectedLocation:any;
  
  map: google.maps.Map;
  branchData: any = [];

  relatedMap: { [key: string]: any };
  typesMap = {};
  typesList: any[] = [];
  typesSelectOptions: any[] = [];
  markerActive: number;
  markers: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  constructor(
    private modalController:ModalController,
    private geolocation: Geolocation,
    private apiService: ApiService,
    private _mapsService: MapsService,
    private _element: ElementRef,
    private branchService: BranchDataService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getBankBranches();
  }

  getBankBranches() {
    this.branchService.getBranches()
    .subscribe((data: any) => {
      this.branchData = data.branch;
      this.setupMap();
      console.log(data);
    });
  }

  async setupMap() {

    const styledMapType = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#cadaca"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#d2e6e8"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ] as google.maps.MapOptions['styles'];

    this.google = await this._mapsService.getGoogleMaps();
    const latLng = new google.maps.LatLng(28.6117993, 77.2194934);

    this.map = new this.google.maps.Map(this.gmap.nativeElement, {
      center: latLng,
      zoom: 14,
      styles: styledMapType,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: this.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      }
    });

    this.getMarkers();
  }


  getMarkers() {
    // tslint:disable-next-line:variable-name
    for (let _i = 0; _i < this.branchData.length; _i++) {
      if (_i > 0) {
        this.setupMarker(this.branchData[_i]);
      }
    }
  }

  setupMarker(location: any) {
    const svgIcon = {
      path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
      fillColor: '#4a4a4a',
      fillOpacity: 0.9,
      scale: 0.8,
      strokeWeight: 0,
    };

    const mrkr = new this.google.maps.Marker({
      position: new this.google.maps.LatLng(Number(location.lat), Number(location.lng)),
      label: {
        text: location.title,
        fontSize: '1.6rem',
        fontWeight: '400',
        fontFamily: "'PlantinMTPro', 'Times New Roman', 'Times', 'Baskerville', 'Georgia', serif",
      },
      map: this.map,
      icon: svgIcon,
    });

    this.markers = [...this.markers, mrkr];

    this.setUpInfoWindow(location, mrkr);

    return mrkr;
  }

  focusMarker(type, index) {
    const marker = type.markers[index];
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.map.setZoom(17);
    marker.map.panTo(marker.position);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 2000);
  }

  setUpInfoWindow(location: any, marker: google.maps.Marker) {

    const infowindow = new google.maps.InfoWindow({
      content: `
        <div class="info_window_container">
          <ion-item detail="false" lines="none">
           <ion-badge slot="end">22 KM Away</ion-badge>
          </ion-item>
          <h4>${location.title}</h4>
          Branch Code : ${location.branch}
          <p>${location.address}</p>
          <ion-chip color="primary" onClick="close(location)">
           <ion-label color="primary">SELECT</ion-label>
          </ion-chip>
        </div>
      `,
    });

  
    this.infoWindows = [...this.infoWindows, infowindow];

    marker.addListener('click', () => {
      console.log("Clicked");
      this.infoWindows.forEach(infoWindow => infoWindow.close());
      infowindow.open(this.map, marker);
      this.markerActive = location.id;
      this.selectedLocation = location;
      const element = this._element.nativeElement.getElementsByClassName(String(location.id))[0];

      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }

    
    });
  
    return infowindow;
  }

  @HostListener("click", ['$event'])
  onClick(event: any) {
    // get the clicked element
    console.log(event,this.selectedLocation);
    if(event.target.innerText== "SELECT"){
      this.dismiss(this.selectedLocation);
    }
  }

  clickedOut() {
    console.log(location);
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'data': location
    });
  }


  dismiss(location:any) {
    console.log(location);
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'data': location
    });
    
  }

  close(){
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.selectedLocation = null;
  }
}
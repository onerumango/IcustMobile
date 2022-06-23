import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  google;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  selectedLocation: any;

  map: google.maps.Map;
  branchData: any = [];

  relatedMap: { [key: string]: any };
  typesMap = {};
  typesList: any[] = [];
  typesSelectOptions: any[] = [];
  markerActive: number;
  markers: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  segment: string;
  branchFlag: any;
  accBranch: string;

  constructor(
    private apiService: ApiService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.getBankBranches();
    this.branchFlag = localStorage.getItem('BranchFlag');
    this.accBranch = localStorage.getItem('AccBranch');
    console.log(this.branchFlag);
  }

  getBankBranches() {
    this.apiService.getBranchByCity("Bangalore")
      .subscribe((data: any) => {
        
        this.branchData = data;
        console.log( this.branchData);
        for(let i=0;i<=this.branchData.length-1;i++){
          this.apiService.getNumberOfCrowd(this.branchData[i].branchName)
          .subscribe((data: any) => {
            console.log(this.branchData[i].branchName)
            this.branchData[i].tokenCount=data.tokenCount
            console.log(this.branchData);
    
          },
          (err: any) => {
console.log("error coming alert")
this.branchData[i].tokenCount=0;
          })
         }

        if(this.branchFlag == 'false'){
          console.log("ifff");
      
         data.forEach((element,index)=>{
          if(data[index].branchName==this.accBranch) data.splice(index,1);
       });
      console.log(this.branchData);
      
         

        }
      });
  }

  async presentMap() {
    const modal = await this.modalController.create({
      component: MapComponent,
      cssClass: 'my-custom-class',
      id:"mapModal",
      swipeToClose: true,
      presentingElement: await this.modalController.getTop()
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log("Data", data);
    if (data) {
      this.dismiss(data);
    }
  }


  dismiss(location: any) {
    console.log(location);
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'data': location
    },"","branchModal");

  }

  close() {
    this.modalController.dismiss();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.selectedLocation = null;
  }
}

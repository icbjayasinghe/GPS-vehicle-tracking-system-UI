import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {DataService} from '../services/data.service';
import { isEmpty } from 'rxjs/operators';
import { isUndefined } from 'util';
import {CheckPointService} from '../services/check-point.service';

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.scss']
})
export class VehicleMapComponent implements OnInit {

  interval: any;
  lat = 7.2906;
  lng = 80.6337;
  markers = [];
  truckIcon: any;
  dotIcon: any;
  officeIcon: any;
  checkPoints = [];
  polylines = [];
  vehicleNumber: 'false';
  selectVehicle: string;


  constructor(
    private vehicleDetails: MapService,
    private checkPointDetails: CheckPointService
  ) { }

  ngOnInit() {
      this.vehicleDetails.getTrackingData(this.vehicleNumber).subscribe(result => {
          this.rebuildPolylines(result);
      });
      this.checkPointDetails.getAllCheckPoints(JSON.parse(localStorage.getItem('user')).userName).subscribe(result => {
          this.getCheckPoints(result.location);
      });
    this.interval = setInterval(() => {
      this.vehicleDetails.getTrackingData(this.vehicleNumber).subscribe(result => {
          this.rebuildPolylines(result);
      });
  }, 30000);
  }
private getCheckPoints(result = []) {
      this.officeIcon = '.../../assets/img/office.png';
      this.checkPoints = result;
}
private rebuildPolylines(result = []) {
    this.markers.length = 0;
    this.polylines = result;
        for (let i = 0; i < this.polylines.length; i++) {
            if (this.polylines[i].trackingData[0].speed > 60) {
                this.truckIcon = '.../../assets/img/red-truck-front.png';
                this.dotIcon = '../../assets/img/dot red.png';
            } else if (this.polylines[i].trackingData[0].speed > 5) {
                this.truckIcon = '.../../assets/img/green-truck-front.png';
                this.dotIcon = '.../../assets/img/dot green.png';
            } else {
                this.truckIcon = '.../../assets/img/yellow-truck-front.png';
                this.dotIcon = '../../assets/img/dot.png';
            }
            this.polylines[i].routeVisibility = 0.0;
            const endMarker = {
                imei: this.polylines[i].imeiNumber,
                lat: this.polylines[i].trackingData[0].latitude,
                lng: this.polylines[i].trackingData[0].longitude,
                speed: this.polylines[i].trackingData[0].speed,
                num: this.polylines[i].vehicleNumber,
                tim: this.polylines[i].trackingData[0].date,
                fuel: false,
                temperature: false,
                truckIcon: this.truckIcon,
                dotIcon: this.dotIcon
            };
            if (this.polylines[i].trackingData[0].fuel) {
                endMarker.fuel = this.polylines[i].trackingData[0].fuel;
            }
            if (this.polylines[i].trackingData[0].temperature) {
                endMarker.temperature = this.polylines[i].trackingData[0].temperature;
            }

            this.markers[i] = endMarker;
        }
        console.log(this.polylines);
}

    requestRoute(vehicleNumber: any) {
      this.vehicleNumber = vehicleNumber;
        this.vehicleDetails.getTrackingData(this.vehicleNumber).subscribe(result => {
            this.polylines = result;
        });
}

search() {
this.markers = this.markers.filter(res => {
    return res.num.toLocaleLowerCase().match(this.selectVehicle.toLocaleLowerCase());
});
}


/*private moniterNewData(result: any) {
    this.oldDataAmount = this.dataAmount;
    this.dataAmount = result.dataAmount;
    for (let i = 0; i < result.vehicle.length; i++) {
        if (result.vehicle[i].trackingData.length === 0) {
            result.vehicle.splice(i, 1);
            i--;
        }
    }
    if (this.dataAmount !== this.oldDataAmount) {
        this.rebuildPolylines(result.vehicle);
    }
}*/


}



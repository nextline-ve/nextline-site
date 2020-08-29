import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

interface myLocation {
  latitude: any;
  longitude: any;
}

@Component({
  selector: "app-address-map",
  templateUrl: "./address-map.component.html",
  styleUrls: ["./address-map.component.scss"],
})
export class AddressMapComponent implements OnInit {
  public isMapReady: Boolean = false;
  @Input() inputLatitude;
  @Input() inputLongitude;
  @Output() setNewLocation = new EventEmitter();
  public currentLocation = {
    latitude: 10.502456738546742,
    longitude: -66.85264314414663,
  };

  constructor() {
    // this.isMapReady = true;
  }

  ngOnInit(): void {
    console.log("asd", this.inputLatitude);
    console.log("asd", this.inputLongitude);
    this.setDefaultValues(this.inputLatitude);
  }

  onChooseLocation(e) {
    console.log(e.coords);
  }

  setDefaultValues(inputLatitude) {
    console.log("_ setDefaultValues", inputLatitude);

    if (inputLatitude) {
      this.currentLocation.latitude = this.inputLatitude;
      this.currentLocation.longitude = this.inputLongitude;
    }
    this.isMapReady = true;
  }

  mapClicked($event: any) {
    this.currentLocation.latitude = $event.coords.lat;
    this.currentLocation.longitude = $event.coords.lng;
  }

  confirm() {
    this.setNewLocation.emit(this.currentLocation);
  }
}

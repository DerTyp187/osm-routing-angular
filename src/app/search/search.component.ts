import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { Nominatim } from '../interfaces/nominatim';
import { NominatimService } from '../services/nominatim.service';
import { Photon, PhotonFeatureCollection } from '../interfaces/photon';
import { PhotonService } from '../services/photon.service';
import { OsrmService } from '../services/osrm.service';
import { Osrm } from '../interfaces/osrm';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() emitter = new EventEmitter<Osrm>();
  @ViewChild("inputautocompleteList") autocompleteList: ElementRef;

  nominatimItemsFrom: Nominatim[] = [];
  nominatimItemsTo: Nominatim[] = [];

  photonItemsFrom: Photon[] = [];
  photonItemsTo: Photon[] = [];

  inputFromValue: string;
  inputToValue: string;

  longFrom: number = 0;
  latFrom: number = 0;
  longTo: number = 0;
  latTo: number = 0;

  selectedPhotonFrom: Photon;
  selectedPhotonTo: Photon;

  constructor(
    private nominatimService: NominatimService,
    private photonService: PhotonService,
    private osrmService: OsrmService,
  ) { }

  getFormattedPhotonValue(p: Photon): string{
    let formatted: string = "";

    if (p.properties.name) {
      formatted += " " + p.properties.name;
    }
    if (p.properties.housenumber) {
      formatted += " " + p.properties.housenumber;
    }
    if (p.properties.postcode) {
      formatted += " " + p.properties.postcode;
    }
    if (p.properties.city) {
      formatted += " " + p.properties.city;
    }
    if (p.properties.countrycode) {
      formatted += " " + p.properties.countrycode;
    }

    return formatted;
  }


  selectPhoton(isFrom: boolean, p: Photon): void{
    if (isFrom) {
      this.selectedPhotonFrom = p;
      this.longFrom = <number> p.geometry?.coordinates[0];
      this.latFrom = <number> p.geometry?.coordinates[1];
      this.inputFromValue = <string> p.properties.name;
      this.inputFromValue = this.getFormattedPhotonValue(p);
      this.photonItemsFrom = [];
    } else {
      this.selectedPhotonTo = p;
      this.longTo = <number>p.geometry?.coordinates[0];
      this.latTo = <number>p.geometry?.coordinates[1];
      this.inputToValue = <string> p.properties.name + " " + p.properties.countrycode;
      this.inputToValue = this.getFormattedPhotonValue(p);
      this.photonItemsTo = [];
    }
  }

  /**
   * Gets called in "app.component.html" when an input changes its value
   */
  getValue(value: string, isFrom: boolean): void {

    //this.updateAutoCompleteList([{display_name: 'Hallo'}, {display_name: 'Test2'}], [{display_name: 'Halload'}, {display_name: 'Test4'}]);

    /*
    this.nominatimService.sendQueryRequest(valueFrom)
    .subscribe((response: Nominatim[]) => this.nominatimItemsFrom = response);

    this.nominatimService.sendQueryRequest(valueTo)
    .subscribe((response: Nominatim[]) => this.nominatimItemsTo = response);
    */

    this.photonItemsFrom = [];
    this.photonItemsTo = [];

    this.photonService.sendQueryRequest(value)
      .subscribe((response: PhotonFeatureCollection) => response.features?.forEach(feature => {
        if (isFrom) {
          this.photonItemsFrom.push(feature);
          this.longFrom = <number>this.photonItemsFrom[0].geometry?.coordinates![0];
          this.latFrom = <number>this.photonItemsFrom[0].geometry?.coordinates![1];
        } else {
          this.photonItemsTo.push(feature);
          this.longTo = <number>this.photonItemsFrom[0].geometry?.coordinates![0];
          this.latTo = <number>this.photonItemsFrom[0].geometry?.coordinates![1];
        }
      })
    );
  }

  getRoute(): void{
    this.osrmService.sendQueryRequest("https://routing.openstreetmap.de/routed-bike/route/v1/driving/" + this.longFrom + "," + this.latFrom + ";" + this.longTo + "," + this.latTo)
      .subscribe((response: Osrm) => {
        this.emitter.emit(response);
        /*
        this.mapComponent.updateSidebar(response);
        this.mapComponent.drawPath(response);
        */
      }
    );
  }
}

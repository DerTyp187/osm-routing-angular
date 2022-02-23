import { Component } from '@angular/core';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent {
  routeSteps = []
  /*
  routeSteps: Array<OsrmStep> = [];

  updateSidebar(osrm: Osrm): void{
    console.log("updateSidebar");
    if (osrm.routes[0].legs[0].steps) {
      this.routeSteps = osrm.routes[0].legs[0].steps;
    }
  }*/

}

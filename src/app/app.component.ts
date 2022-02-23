import { Component, ViewChild, } from '@angular/core';
import { Osrm } from './interfaces/osrm';
import { MapComponent } from './map/map.component';
import { RouteListComponent } from './route-list/route-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css', '../../node_modules/ol/ol.css' ]
})
export class AppComponent {

  title = "Street Map";

  @ViewChild('mapRef') mapCompopnent!: MapComponent;
  @ViewChild('routeListRef') routeListCompopnent!: RouteListComponent;

  onSearchResponse($event: Osrm): void {
		this.mapCompopnent.drawPath($event);
    this.routeListCompopnent.updateSidebar($event);
	}

}

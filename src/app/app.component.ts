import { Component, ViewChild, } from '@angular/core';
import { MapComponent } from './map/map.component';
import { RouteResponse } from './interfaces/routeResponse';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css', '../../node_modules/ol/ol.css' ]
})
export class AppComponent {

  title = "Street Map";

  @ViewChild('mapRef') mapCompopnent!: MapComponent;

  onSearchResponse($event: RouteResponse): void {
		this.mapCompopnent.drawPath($event);
	}

}

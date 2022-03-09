import { Component, AfterViewInit } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';
import { fromLonLat, transform } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import LineString from 'ol/geom/LineString';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import { RouteResponse } from '../interfaces/routeResponse';
import { Stroke, Style } from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  map: Map;

  lineStyle: Style = new Style({
    stroke: new Stroke({
      color: "#ff622e",
      width: 3
    })
  })


  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([8, 52]),
        zoom: 2
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });
    setTimeout(() => this.map.updateSize(), 200);
  }

  drawPath(routeResponse: RouteResponse): void {
    // https://routing.openstreetmap.de/routed-bike/route/v1/driving/8.6042708,53.5151533;13.6887164,51.0491468?overview=false&alternatives=true&steps=true
    console.log(routeResponse);

    const nodes = routeResponse.nodes || [];
    const fCoordinates: number[][] = nodes.map(node => (transform([node.lon, node.lat], 'EPSG:4326', 'EPSG:3857')));
    const lineString: LineString = new LineString(fCoordinates);
    const feature: Feature<Geometry> = new Feature({ geometry: lineString });
    feature.setStyle(this.lineStyle);
    const vectorSource = new VectorSource({ features: [feature] });
    const vectorLayer = new VectorLayer({ source: vectorSource });
    this.map.removeLayer(this.map.getLayers().item(1))
    this.map.addLayer(vectorLayer);

    this.map.getView().setCenter(fCoordinates[0])
    this.map.getView().setZoom(13);
  }
}

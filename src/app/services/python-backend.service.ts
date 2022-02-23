import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteResponse } from '../interfaces/routeResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonBackendService {
  url: string = "http://127.0.0.1:5555/getRouteByCoordinates/"

  constructor(private http: HttpClient) { }

  /**
   * sends a query request to Osrm and gets response (http://project-osrm.org/docs/v5.24.0/api/?language=cURL#table-service)
   */
  sendQueryRequest(fromWayLat: string, fromWayLon: string, toWayLat: string, toWayLon: string): Observable<RouteResponse> {
    console.log(this.url + fromWayLat + "/" + fromWayLon + "/" + toWayLat + "/" + toWayLon);
    return this.http.get<RouteResponse>(this.url + fromWayLat + "/" + fromWayLon + "/" + toWayLat + "/" + toWayLon);
  }
}

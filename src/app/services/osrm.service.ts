import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Osrm } from '../interfaces/osrm';

/**
 * http://router.project-osrm.org/route/v1/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?overview=false&steps=true&geometries=geojson
 */
@Injectable({
  providedIn: 'root'
})
export class OsrmService{

  reqParam: string = "?overview=full&alternatives=false&steps=true&geometries=geojson";
  constructor(private http: HttpClient) { }

  /**
   * sends a query request to Osrm and gets response (http://project-osrm.org/docs/v5.24.0/api/?language=cURL#table-service)
   */
  sendQueryRequest(url: string): Observable<Osrm> {
    console.log(url + this.reqParam);
    return this.http.get<Osrm>(url + this.reqParam);
  }

}

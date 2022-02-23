import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotonFeatureCollection } from '../interfaces/photon';
import { Observable } from 'rxjs';

/**
 * Communicates with Photon (https://photon.komoot.io/)
 */
@Injectable({
  providedIn: 'root'
})
export class PhotonService{

  constructor(private http: HttpClient) { }

  /**
   * Sends a query request to Photon and gets response (https://photon.komoot.io/)
   */
  sendQueryRequest(queryString: string): Observable<PhotonFeatureCollection> {
    return this.http.get<PhotonFeatureCollection>("https://photon.komoot.io/api/?q=" + queryString + "&limit=10&zoom=12");
  }

}

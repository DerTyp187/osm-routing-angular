import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nominatim } from '../interfaces/nominatim';
import { Observable } from 'rxjs';

/**
 * communicates with Nominatim (https://nominatim.org/)
 */
@Injectable({
  providedIn: 'root'
})
export class NominatimService{

  constructor(private http: HttpClient) { }

  /**
   * sends a query request to Nominatim and gets response (https://nominatim.org/release-docs/develop/api/Search/)
   */
  sendQueryRequest(queryString: string): Observable<Nominatim[]> {
    return this.http.get<Nominatim[]>("https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=" + queryString);
  }

}

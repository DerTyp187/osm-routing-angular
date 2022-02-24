import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteResponse } from '../interfaces/routeResponse';
import { Observable } from 'rxjs';
import { SearchResponse } from '../interfaces/searchResponse';

@Injectable({
  providedIn: 'root'
})
export class PythonBackendService {
  urlRoute: string = "http://127.0.0.1:5555/getRoute/"
  urlSearch: string = "http://127.0.0.1:5555/search/"
  constructor(private http: HttpClient) { }

  /**
   * sends a query request to Osrm and gets response (http://project-osrm.org/docs/v5.24.0/api/?language=cURL#table-service)
   */
  sendRouteQueryRequest(wayStart: string, wayEnd: string): Observable<RouteResponse> {
    console.log(this.urlRoute + wayStart + "/" + wayEnd);
    return this.http.get<RouteResponse>(this.urlRoute + wayStart + "/" + wayEnd);
  }
  sendSearchQueryRequest(query: string, limit: string): Observable<SearchResponse>{
    console.log(this.urlSearch + query + "/" + limit);
    return this.http.get<SearchResponse>(this.urlSearch + query + "/" + limit);
  }
}

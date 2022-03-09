import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PythonBackendService } from '../services/python-backend.service';
import { RouteResponse } from '../interfaces/routeResponse';
import { SearchResponse, SearchWay } from '../interfaces/searchResponse';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() emitter = new EventEmitter<RouteResponse>();

  searchItemsFrom: SearchWay[] = [];
  searchItemsTo: SearchWay[] = [];

  selectedSearchWayFrom: SearchWay;
  selectedSearchWayTo: SearchWay;

  inputFromValue: string;
  inputToValue: string;

  isSearching: boolean = false;

  constructor(
    private pythonBackendService: PythonBackendService,
  ) { }

  select(isFrom: boolean, item: SearchWay): void {
    if (isFrom) {
      this.selectedSearchWayFrom = item;
      this.inputFromValue = item.name;
      this.searchItemsFrom = [];
    } else {
      this.selectedSearchWayTo = item;
      this.inputToValue = item.name;
      this.searchItemsTo = [];
    }
  }

  /**
   * Gets called in "app.component.html" when an input changes its value
   */
  getValue(value: string, isFrom: boolean): void {
    this.searchItemsFrom = [];
    this.searchItemsTo = [];

    value = value.trim();

    this.pythonBackendService.sendSearchQueryRequest(value, "10") // "10" -> limit of search results
      .subscribe((response: SearchResponse) => response.ways?.forEach(way => {
        if (isFrom) {
          this.searchItemsFrom.push(way);
          this.selectedSearchWayFrom = way;
        } else {
          this.searchItemsTo.push(way);
          this.selectedSearchWayTo = way;
        }
      }));
  }

  getRoute(): void {
    if (this.selectedSearchWayFrom && this.selectedSearchWayTo)
      this.isSearching = true;
    this.pythonBackendService.sendRouteQueryRequest(this.selectedSearchWayFrom.id.toString(), this.selectedSearchWayTo.id.toString())
      .pipe(catchError(err => {
        console.error(err);
        return of({ nodes: [] });
      }))
      .subscribe(
        (response: RouteResponse) => {
          this.emitter.emit(response);
          this.isSearching = false;
        });
  }

}

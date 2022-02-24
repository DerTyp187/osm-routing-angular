import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PythonBackendService } from '../services/python-backend.service';
import { RouteResponse } from '../interfaces/routeResponse';
import { SearchResponse, SearchWay } from '../interfaces/searchResponse';

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

  getRouteBtnEnabled: boolean = true;

  constructor(
    private pythonBackendService: PythonBackendService,
  ) { }

  select(isFrom: boolean, item: SearchWay): void{
    if(isFrom){
      this.selectedSearchWayFrom = item;
      this.inputFromValue = item.name;
      this.searchItemsFrom = [];
    }else{
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

    this.pythonBackendService.sendSearchQueryRequest(value, "10")
    .subscribe((response: SearchResponse) => response.ways?.forEach(way =>{
      if(isFrom){
        this.searchItemsFrom.push(way);
        this.selectedSearchWayFrom = way;
      }else{
        this.searchItemsTo.push(way);
        this.selectedSearchWayTo = way;
      }
    }));
  }

  getRoute(): void{
    this.getRouteBtnEnabled = false;
    this.pythonBackendService.sendRouteQueryRequest(this.selectedSearchWayFrom.id.toString(), this.selectedSearchWayTo.id.toString())
      .subscribe((response: RouteResponse) => {
        console.log(response);
        this.emitter.emit(response);
        this.getRouteBtnEnabled = true;
        /*
        this.mapComponent.updateSidebar(response);
        this.mapComponent.drawPath(response);
        */
      }
    );
  }
}

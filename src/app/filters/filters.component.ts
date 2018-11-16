import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(public filterService: FilterService, public mainService: MainService) { }

  ngOnInit() {
  //  this.mainService.getCategories();
  }



}

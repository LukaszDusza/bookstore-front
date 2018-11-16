import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(public mainService: MainService, private spinner: NgxSpinnerService) { }

filterCategory: string = "";
filterAuthor: string = "";


onCategoryChange(){
  this.mainService.getBooksByCategory(this.filterCategory);
} 

onAuthorChange(){
  this.mainService.getBooksByAuthor(this.filterAuthor);
}


}

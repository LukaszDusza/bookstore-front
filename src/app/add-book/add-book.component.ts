import { Component, OnInit } from '@angular/core';
import { Book } from '../objects/book';
import { MainService } from '../main.service';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  constructor(private mainService: MainService) { }

  ngOnInit() {
this.getCategory();
  
   }

  addBook() {
    this.mainService.addBook(this.mainService.book);   
  }

  getCategory() {
    this.mainService.getCategory();
  }

}

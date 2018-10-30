import { Component, OnInit } from '@angular/core';
import { Book } from '../objects/book';
import { MainService } from '../main.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.getCategory()
  }

  updateBook() {
  this.mainService.updateBook(this.mainService.actualIsbn, this.mainService.book);
  }

  getCategory() {
    this.mainService.getCategory();
  }

}

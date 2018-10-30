import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Book } from '../objects/book';
import { MainService } from '../main.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit, OnChanges {

  constructor(private mainService: MainService) { }

  ngOnInit() { }

  ngOnChanges(changes : SimpleChanges): void {
    // this.getBooks();
     console.log("ngOnChanges");
   }

  updateBook() {
  this.mainService.updateBook(this.mainService.actualIsbn, this.mainService.book);
  }



}

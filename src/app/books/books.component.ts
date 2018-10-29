import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Book } from '../objects/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  title: String = "BookComponent works!";


  constructor(private mainService: MainService) { }

  ngOnInit() { }

  updateBook(book: Book) {
    this.mainService.book = book;
    console.log(this.mainService.book);
  }

  deleteBook(isbn: String) {
    this.mainService.deleteBook(isbn);
    //  console.log(isbn);
  }



}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MainService } from '../main.service';
import { Book } from '../objects/book';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
    // this.getBooks();
  //  console.log("ngOnChanges");
  }

  public data: any;

  title: String = "BookComponent works!";
  
  constructor(public mainService: MainService, public auth: AuthService) { }

  ngOnInit() {
     if (this.mainService.books.length < 1) {
       this.getAllBooks();   
     }
  }

  updateBook(book: Book) {
    this.mainService.book = book;
    this.mainService.actualIsbn = book.isbn;
    // console.log(this.mainService.book);
  }

  getBooks() {
    this.mainService.getBooks();
  }

  getChart() {
    this.mainService.getChart()
  }

  getAllBooks() {
    this.mainService.getAllBooks();
  }

  deleteBook(isbn: String) {
    this.mainService.deleteBook(isbn);
    //  console.log(isbn);
  }

  saveToXLS() {
    this.mainService.saveToXLS(this.mainService.books);
  }


  getPDF() { }

}




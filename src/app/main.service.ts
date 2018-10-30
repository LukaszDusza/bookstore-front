import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from './objects/category';
import { Book } from './objects/book';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

const url = environment.config.host;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  books = new Array<Book>();
  book: Book = new Book();
  actualIsbn: string = "";
  categories = new Array<Category>();
  host: String = 'http://localhost:8080/api/v1/';
  chart;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  getBooks() {
    this.spinner.show();
    this.books = [];
    this.categories = [];
    let result = this.http.get<Array<Book>>(url).subscribe(res => {
      res.map(r => {
        //  console.log(r);
        this.books.push(r);
      })
    }, err => {
      console.log(err);
    }, () => {
      this.getCategories();
        this.getChart();
      this.spinner.hide();
    })
  }

  addBook(book: Book) {
    this.http.post(url, book).subscribe(res => {
    })
  }

  deleteBook(isbn: String) {
    this.http.delete(url + "?isbn=" + isbn).subscribe(r => {
      //  console.log(r)
    }, err => { }, () => this.getBooks())
  }

  updateBook(isbn: string, book: Book) {
    //  console.log(isbn, book);
    this.http.put(url + "?isbn=" + isbn, book).subscribe(r => {
      //  console.log(r)
    }, err => { }, () => { })
  }

  getSelectedCategory(event) { //(change)
    console.log(event);
    this.book.category = event.target.value;
  }

  getCategories() {
    this.categories = [];
    let result = this.http.get<Array<Category>>(this.host + "categories").subscribe(res => {
      res.map(r => {
        //   console.log(r);
        this.categories.push(r);
      })
    }, err => { }, () => {

    })

  }

  getBooksToChartArray(books: Array<Book>) {
    let arrayCat = [];
    let array = [];
    let objs = {};
    let categories = new Array<String>();
    let counter = 0;

    books.map(b => arrayCat.push(b.category));
    console.log(arrayCat);
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      if (!objs[book.category]) {
        objs[book.category] = book;
        categories.push(book.category);
      }
    }

    for (let i = 0; i < categories.length; i++) {
      counter = 0;
      for (let j = 0; j < arrayCat.length; j++) {
        if (categories[i] === arrayCat[j]) {
          counter++;
        }
      }
      array.push([categories[i], counter]);
    }
    array.unshift(["Category", "Number"]);

      console.log(array);
    return array;
  }

  getChart() {
    this.chart = {
      chartType: 'BarChart',
      dataTable: this.getBooksToChartArray(this.books),
      options: {
        'legend': 'none',
        chartArea: { left: 30, top: 40, width: "80%", height: "90%" },
        height: 300,
        width: 350,
        allowHtml: true
      },
    };
  }

}





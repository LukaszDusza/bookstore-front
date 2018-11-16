import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Category } from './objects/category';
import { Book } from './objects/book';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Myfile } from './objects/myfiles';
import { saveAs } from 'file-saver';



const url = environment.config.api;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  books = new Array<Book>();
  book: Book = new Book();
  actualIsbn: string = "";
  categories = new Array<Category>();
  authors = new Array<String>();

  chart;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  getBooks(value?: string) {

    this.getAllBooks();

    this.getCategories();
    this.getAuthors();
    this.getChart();

  }

  getAllBooks() {
    this.spinner.show();
    this.books = [];
    this.http.get<Array<Book>>(url + "books").subscribe(res => {
      res.map(r => {
        this.books.push(r);
      })
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    }, () => {
      this.getCategories();
      this.getAuthors();
      this.spinner.hide();
    })
  }

  getBooksByCategory(value: string) {
    this.spinner.show();
    this.books = [];
    let params = new HttpParams().set('category', value);
    this.http.get<Array<Book>>(url + "books", { params: params }).subscribe(res => {
      res.map(r => {
        this.books.push(r);
      })
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    }, () => {
      this.spinner.hide();
      console.log(this.books);
    })
  }

  getBooksByAuthor(value: string) {
    this.spinner.show();
    this.books = [];
    let params = new HttpParams().set('author', value);
    this.http.get<Array<Book>>(url + "books", { params: params }).subscribe(res => {
      res.map(r => {
        this.books.push(r);
      })
    }, (err) => {

      console.log(err);
    }, () => {
      this.spinner.hide();
      console.log(this.books);
    })
  }

  getBooksByIsbn(value: string) {
    this.spinner.show();
    this.books = [];
    let params = new HttpParams().set('isbn', value);
    this.http.get<Array<Book>>(url + "books", { params: params }).subscribe(res => {
      res.map(r => {
        this.books.push(r);
      })
    }, (err) => {

      console.log(err);
    }, () => {
      this.spinner.hide();
      console.log(this.books);
    })
  }

  addBook(book: Book) {
    this.http.post(url + "books", book).subscribe(res => {
    })
  }

  deleteBook(isbn: String) {
    this.http.delete(url + "books/" + isbn).subscribe(r => {
      //  console.log(r)
    }, err => { }, () => this.getBooks())
  }

  updateBook(isbn: string, book: Book) {
    //  console.log(isbn, book);
    this.http.put(url + "books?isbn=" + isbn, book).subscribe(r => {
      //  console.log(r)
    }, err => { }, () => { })
  }

  getSelectedCategory(event) { //(change)
    console.log(event);
    this.book.category = event.target.value;
  }

  getCategories() {
    this.categories = [];
    this.http.get<Array<Category>>(url + "categories").subscribe(res => {
      res.map(r => {
        this.categories.push(r);
      })
    }, err => { }, () => {

    })
  }

  getAuthors() {
    this.authors = [];
    this.http.get<Array<String>>(url + "books/authors").subscribe(res => {
      res.map(r => {
        this.authors.push(r);
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

  saveToXLS(books: Array<Book>) {

    this.spinner.show();
    // let params = new HttpParams().set('file', "books1542387744077.xls");
    this.http.post(url + "books/file/add", books).subscribe(res => {

    }, (err) => {
      this.spinner.hide();
      console.log(err);
    }, () => {
      this.spinner.hide();
    })
  }


  myfiles = new Array<Myfile>();
  getFiles() {
    this.myfiles = [];
    this.spinner.show();
    // let params = new HttpParams().set('file', "books1542387744077.xls");
    this.http.get<Array<Myfile>>(url + "books/storage").subscribe(res => {
      res.map(r => this.myfiles.push(r));
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    }, () => {
      this.spinner.hide();
    })
  }

  onDelete(name: string) {
    this.http.delete(url + "books/delete/" + name).subscribe(file => {
      console.log(file);
    }, err => { }, () => {
      this.getFiles();
    });
  }

  downloadFile(myfile: Myfile) {
      this.spinner.show(); 
    let params = new HttpParams().set('filename', myfile.fullPath);
    this.http.get(url + "books/download", { params: params, responseType: 'blob' }).subscribe(res => {
      saveAs(res, myfile.name);
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    }, () => {
         this.spinner.hide();     
    })
  }

}





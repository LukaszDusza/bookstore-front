import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './objects/category';
import { Book } from './objects/book';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  books = new Array<Book>();
  categories = new Array<Category>();

  constructor(private http: HttpClient) { }

  host: String = 'http://localhost:8080/api/v1/';

  book: Book = {
    title: null,
    author: null,
    isbn: null,
    category: null
  };

  getBooks() {
    this.books = [];
    let result = this.http.get<Array<Book>>(this.host + 'books').subscribe(res => {
      res.map(r => {
        //  console.log(r);
        this.books.push(r);
      })
    }, err => {
      //  console.log(err);
    }, () => { })

  }

  addBook(book: Book) {
    let result = this.http.post(this.host + 'books', book).subscribe(res => {
      // console.log(res);
    })
  }

  deleteBook(isbn: String) {
    this.http.delete(this.host + 'books' + "/" + isbn).subscribe(r => {
      //  console.log(r)
    }, err => { }, () => this.getBooks())
  }

  updateBook(isbn: string, book: Book) {
    const formData = new FormData();
    formData.append("isbn", isbn)
    this.http.put(this.host + 'books', book).subscribe(r => {
      //  console.log(r)
    }, err => { }, () => { })

  }

  getSelectedCategory(event) {
    this.book.category = event.target.value;
  }

  getCategory() {
    this.categories = [];
    let result = this.http.get<Array<Category>>(this.host + "categories").subscribe(res => {
      res.map(r => {
        //   console.log(r);
        this.categories.push(r);
      })
    }, err => { }, () => { })

  }

}





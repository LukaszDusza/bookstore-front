import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './objects/user';
import { map } from 'rxjs/operators';

const url = environment.config.login;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedId$ = new BehaviorSubject<boolean>(this.getToken() !== null ? true : false);

  constructor(private http: HttpClient, @Inject('AUTH_TOKEN') private authToken: string, @Inject('AUTH_USER') private authUser: string) {

  }

  token;
  user;


  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'x-www-form-urlencoded');

    this.http.post(url, { username, password }, { headers: headers, observe: "response" }).subscribe(response => {
      this.token = response.headers.get('Authorization');
      this.user = response.headers.get('User')
      localStorage.setItem('AUTH_USER', response.headers.get('User'));
      localStorage.setItem('AUTH_TOKEN', response.headers.get('Authorization'));
      console.log(response);
      console.log(response.headers.get("Authorization"));
      this.loggedId$.next(true);
    }, () => {
      this.loggedId$.next(false);
    });

  }

  getDataToken() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization", this.token);
    console.log(["SEND TO BACKEND", headers]);

    this.http.get("http://localhost:8081/secured", { headers: headers, observe: "response" }).subscribe(response => {
      localStorage.setItem('AUTH_USER', response.headers.get('User'));
      localStorage.setItem('AUTH_TOKEN', response.headers.get('Authorization'));
      console.log(["RESPONSE FROM BACKEND", response]);
     // console.log(response.body);
      this.loggedId$.next(true);
    }, () => {
      this.loggedId$.next(false);
    });

  }

  getDataWithoutToken() {
    this.http.get("http://localhost:8081/secured").subscribe(response => {
      console.log(["RESPONSE FROM BACKEND", response]);
    });

  }

  getNonSecuredData() {
     this.http.get("http://localhost:8081/tasks").subscribe(response => {
      console.log(["RESPONSE FROM BACKEND", response]);
     }); 
   }

  getUser(): User {
    return new User(JSON.parse(localStorage.getItem(this.authUser)));
  }

  isLoggedId(): BehaviorSubject<boolean> {
    return this.loggedId$;
  }

  getToken(): string {
    return localStorage.getItem(this.authToken);
  }

  logout(): void {
    //  localStorage.removeItem(this.authToken);
    //  localStorage.removeItem(this.authUser);
    localStorage.removeItem('AUTH_USER');
    localStorage.removeItem('AUTH_TOKEN');
    this.loggedId$.next(false);
  }


}


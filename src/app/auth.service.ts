import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './objects/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const url = environment.config.login;

const token = "AUTH_TOKEN";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedId$ = new BehaviorSubject<boolean>(this.getToken() !== null ? true : false);

  constructor(
    private http: HttpClient,
    //  @Inject('AUTH_TOKEN') private authToken: string, 
    //  @Inject('AUTH_USER') private authUser: string
    private router: Router

  ) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(url, { username, password }, { headers: headers, observe: "response" }).subscribe(response => {

      localStorage.setItem(token, response.headers.get('Authorization'));
      this.loggedId$.next(true);
      console.log(response);
    }, err => {
      this.loggedId$.next(false);
    }, () => {

    });

  }

  // getUser(): User {
  //   return new User(JSON.parse(localStorage.getItem(this.authUser)));
  // }

  isLoggedId(): BehaviorSubject<boolean> {
    return this.loggedId$;

  }

  getToken(): string {
    return localStorage.getItem(token);
  }

  logout(): void {
    //  localStorage.removeItem(this.authToken);
    //  localStorage.removeItem(this.authUser);
    //  localStorage.removeItem('AUTH_USER');
    localStorage.removeItem(token);
    this.loggedId$.next(false);
    this.router.navigateByUrl('login');
  }


}


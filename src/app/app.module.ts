import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MainService } from './main.service';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { NavigationComponent } from './navigation/navigation.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { UploadsComponent } from './uploads/uploads.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    AddBookComponent,
    UpdateBookComponent,
    NavigationComponent,
    UploadsComponent,
    LoginComponent,
    LogoutComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    NgxSpinnerModule,
    BrowserAnimationsModule,  
    Ng2GoogleChartsModule
   
  ],
  providers: [
    MainService, 
    AuthService, 
    AuthGuardService,
    // {provide: 'AUTH_TOKEN', useValue: 'token'},
    // {provide: 'AUTH_USER', useValue: 'user'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [LogoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

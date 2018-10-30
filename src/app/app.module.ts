import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    AddBookComponent,
    UpdateBookComponent,
    NavigationComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    
   
    NgxSpinnerModule,
    BrowserAnimationsModule,  
    Ng2GoogleChartsModule
   
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }

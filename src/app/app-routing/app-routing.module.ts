import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BooksComponent } from '../books/books.component';
import { AppComponent } from '../app.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { UploadsComponent } from '../uploads/uploads.component';


const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "books",
        component: BooksComponent,
    },
    {
        path: "add",
        component: AddBookComponent,
    },
    {
        path: "uploads",
        component: UploadsComponent,
    },
    {
        path: "update",
        component: UpdateBookComponent,
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        CommonModule
    ],
    exports: [
        RouterModule
    ],
    declarations:[],
    bootstrap: [AppComponent]

})

export class AppRoutingModule { }

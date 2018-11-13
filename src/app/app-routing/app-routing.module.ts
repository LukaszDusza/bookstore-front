import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BooksComponent } from '../books/books.component';
import { AppComponent } from '../app.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { UploadsComponent } from '../uploads/uploads.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuardService } from '../auth-guard.service';
import { LogoutComponent } from '../logout/logout.component';


const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent, 
        canActivate: [AuthGuardService],
    },
    {
        path: "books",
        component: BooksComponent, 
        canActivate: [AuthGuardService],
    },
    {
        path: "add",
        component: AddBookComponent, 
        canActivate: [AuthGuardService],
    },
    {
        path: "uploads",
        component: UploadsComponent, 
        canActivate: [AuthGuardService],
    },
    {
        path: "update",
        component: UpdateBookComponent, 
        canActivate: [AuthGuardService],
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "logout",
        component: LogoutComponent,
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

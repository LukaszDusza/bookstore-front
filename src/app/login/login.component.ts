import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showErrorMessage = false;

  form:FormGroup;

  constructor(public auth: AuthService, private router: Router, private formBuilder: FormBuilder) { 
    this.auth.isLoggedId().subscribe((loggedIn: boolean) => {
      this.showErrorMessage = !loggedIn;
      if (loggedIn) {
        this.router.navigateByUrl('');
      }
    });
  }

  login(loginForm: NgForm): void {
    this.auth.login(loginForm.value.login, loginForm.value.password);
  }

  ngOnInit() {
   
  }

}

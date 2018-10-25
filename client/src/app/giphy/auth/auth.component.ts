import { Component, ViewChild } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Gifs, Tags } from "../shared/giphy.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  gifs: Gifs[]
  tags: Tags[]
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
  isAuthError: boolean = false

  @ViewChild('loginForm') loginForm: NgForm
  @ViewChild('signupForm') signupForm: NgForm
  constructor(
    private giphyService: GiphyService,
    private router : Router
  ) {

  }

  clearForm() {
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.errorMessage = "";
    this.isAuthError = false
  }

  submitLogin(loginForm: NgForm) {
    const userDetails = {
      email: this.email,
      password: this.password
    }
    this.giphyService.requestLogin(userDetails).then((token) => {
      localStorage.setItem('capstone_token', token);
      document.getElementById("closeBtn").click();
      this.clearForm
      this.router.navigate(['/home']);
    }).catch((err) => {
      this.isAuthError = true;
      this.errorMessage = err.error.message;
    })
  }

  submitSignup(signupForm: NgForm) {
    if(this.password !== this.confirmPassword) {
      this.isAuthError = true;
      return this.errorMessage = "passwords do not match";
    }
    const userDetails = {
      email: this.email,
      password: this.password
    }
    this.giphyService.requestSignup(userDetails).then((token) => {
      localStorage.setItem('capstone_token', token);
      document.getElementById("closeBtn").click();
      this.clearForm
      this.router.navigate(['/home']);
    }).catch((err) => {
      this.isAuthError = true;
      this.errorMessage = err.error.message;
    })
  }
}

import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { GiphyService } from "../shared/giphy.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('capstone_token')
    if (token != null) {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", token)
      });
      return next.handle(clonedreq)
    }
    return next.handle(req)
  }
}
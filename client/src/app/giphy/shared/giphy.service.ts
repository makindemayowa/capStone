import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gifs } from "./giphy.model";
import { Tags } from "./giphy.model";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// const BASE_URL = `https://twigif.herokuapp.com`;
const BASE_URL = `http://localhost:4000`

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(private http: HttpClient) { }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }

  getGiphies(): Observable<Gifs[]> {
    return this.http.get<Gifs[]>(`${BASE_URL}/api/randomGiphy`)
      .pipe(
        tap(heroes => heroes),
        catchError(this.handleError('getGiphies', []))
      );
  }

  searchGiphies(query: string): Observable<Gifs[]> {
    return this.http.get<Gifs[]>(`${BASE_URL}/api/search?q=${query}`)
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('searchGiphies', []))
    );
  }

  getTrends(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${BASE_URL}/api/trends`)
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('getTrends', []))
    );
  }

  requestSignup(userDetails) {
    return this.http.post(`${BASE_URL}/api/signup`, userDetails)
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('requestSignup', []))
    );
  }

  requestLogin(userDetails) {
    return this.http.post(`${BASE_URL}/api/login`, userDetails)
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('requestLogin', []))
    );
  }

  addFavorite(favorite) {
    return this.http.post(`${BASE_URL}/api/favorite`, { favorite })
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('addFavorite', []))
    );
  }

  removeFavorite(favorite) {
    return this.http.put(`${BASE_URL}/api/favorite`, { favorite })
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('removeFavorite', []))
    );
  }

  getUser() {
    return this.http.get(`${BASE_URL}/api/user`)
    .pipe(
      tap(heroes => heroes),
      catchError(this.handleError('getUser', []))
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gifs } from "./giphy.model";
import { Tags } from "./giphy.model";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }

  getGiphies(): Observable<Gifs[]> {
    return this.http.get<Gifs[]>('http://localhost:4000/api/randomGiphy')
      .pipe(
        tap(heroes => console.log('fetched heroes', heroes)),
        catchError(this.handleError('getGiphies', []))
      );
  }

  searchGiphies(query: string) {
    return this.http.get(`http://localhost:4000/api/search?q=${query}`)
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }

  getTrends() {
    return this.http.get(`http://localhost:4000/api/trends`)
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }

  requestSignup(userDetails) {
    return this.http.post(`http://localhost:4000/api/signup`, userDetails)
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }

  requestLogin(userDetails) {
    return this.http.post(`http://localhost:4000/api/login`, userDetails)
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }

  addFavorite(favorite) {
    return this.http.post(`http://localhost:4000/api/favorite`, { favorite })
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }

  removeFavorite(favorite) {
    return this.http.put(`http://localhost:4000/api/favorite`, { favorite })
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }

  getUser() {
    return this.http.get(`http://localhost:4000/api/user`)
    .pipe(
      tap(heroes => console.log('fetched heroes', heroes)),
      catchError(this.handleError('getGiphies', []))
    );
  }
}
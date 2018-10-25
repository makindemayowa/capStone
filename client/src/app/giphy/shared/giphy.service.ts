import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gifs } from "./giphy.model";
import { Tags } from "./giphy.model";

@Injectable()
export class GiphyService {
  constructor(private http: HttpClient) { }

  getGiphies() {
    return this.http.get('http://localhost:4000/api/randomGiphy').toPromise().then((res) => {
      return res['randGifs'] as Gifs[]
    })
  }

  searchGiphies(query: string) {
    return this.http.get(`http://localhost:4000/api/search?q=${query}`).toPromise().then((res) => {
      return res['result'] as Gifs[]
    })
  }

  getTrends() {
    return this.http.get(`http://localhost:4000/api/trends`).toPromise().then((res) => {
      return res['trends'] as Tags[]
    })
  }

  requestSignup(userDetails) {
    return this.http.post(`http://localhost:4000/api/signup`, userDetails).toPromise().then((res) => {
      return res['jsonToken']
    })
  }

  requestLogin(userDetails) {
    return this.http.post(`http://localhost:4000/api/login`, userDetails).toPromise().then((res) => {
      return res['jsonToken']
    })
  }

  addFavorite(favorite) {
    return this.http.post(`http://localhost:4000/api/favorite`, { favorite }).toPromise().then((res) => {
      return res['updatedUser']
    })
  }

  removeFavorite(favorite) {
    return this.http.put(`http://localhost:4000/api/favorite`, { favorite }).toPromise().then((res) => {
      return res['updatedUser']
    })
  }

  getUser() {
    return this.http.get(`http://localhost:4000/api/user`).toPromise().then((res) => {
      return res['user']
    })
  }
}
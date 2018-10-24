import { Injectable } from '@angular/core';
import axios from 'axios';
import { Gifs } from "./giphy.model";
import { Tags } from "./giphy.model";

@Injectable()
export class GiphyService {
  constructor() {

  }

  getGiphies() {
    return axios.get('http://localhost:4000/api/randomGiphy').then((res) => {
      return res.data.randGifs as Gifs[]
    })
  }

  searchGiphies(query: string) {
    return axios.get(`http://localhost:4000/api/search?q=${query}`).then((res) => {
      return res.data.result as Gifs[]
    })
  }

  getTrends() {
    return axios.get(`http://localhost:4000/api/trends`).then((res) => {
      return res.data.trends as Tags[]
    })
  }

  requestSignup(userDetails) {
    return axios.post(`http://localhost:4000/api/signup`, userDetails).then((res) => {
      return res.data.jsonToken
    })
  }
  requestLogin(userDetails) {
    return axios.post(`http://localhost:4000/api/login`, userDetails).then((res) => {
      return res.data.jsonToken
    })
  }
}
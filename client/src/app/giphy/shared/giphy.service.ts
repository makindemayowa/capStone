import { Injectable } from '@angular/core';
import axios from 'axios';
import { Gifs } from "./giphy.model";

@Injectable()
export class GiphyService {
  constructor() {

  }

  getEntries() {
    return axios.get('http://localhost:4000/api/randomGiphy').then((res) => {
      return res.data.randGifs as Gifs[]
    })
  }
}
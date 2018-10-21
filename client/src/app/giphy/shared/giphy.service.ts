import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export class GiphyService {
  constructor() {

  }

  getEntries() {
    return axios.get('http://localhost:4200/api/randomGiphy').then((res) => {
      console.log(res)
    })
  }
}
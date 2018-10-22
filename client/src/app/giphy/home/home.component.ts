import { Component } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";
import { Gifs } from "../shared/giphy.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  gifs: Gifs[]
  constructor(private giphyService: GiphyService) {

  }
  ngOnInit() {
    this.giphyService
      .getEntries()
      .then(entries => {
        this.gifs = entries
      })
  }
}

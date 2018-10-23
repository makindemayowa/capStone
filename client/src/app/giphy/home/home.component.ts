import { Component } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";
import { Gifs, Tags } from "../shared/giphy.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  gifs: Gifs[]
  tags: Tags[]
  constructor(
    private giphyService: GiphyService
  ) {

  }
  ngOnInit() {
    this.giphyService
      .getGiphies()
      .then(entries => {
        this.gifs = entries
      })
    this.giphyService
      .getTrends()
      .then(tags => {
        this.tags = tags
      })
  }
}

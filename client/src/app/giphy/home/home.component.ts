import { Component } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";
import { Router } from '@angular/router';
import { Gifs, Tags } from "../shared/giphy.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  gifs: Gifs[];
  tags: Tags[];
  isLogged: boolean = false;
  loading: boolean = false;
  favs;
  constructor(
    private giphyService: GiphyService,
    private router: Router
  ) {

  }
  ngOnInit() {
    if (localStorage.getItem('capstone_token')) {
      this.isLogged = true;
      this.giphyService.getUser().then((user) => {
        this.favs = user.favorites
      })
    }
    this.loading = true
    this.giphyService
      .getGiphies()
      .then(entries => {
        this.loading = false
        this.gifs = entries
      })
    this.giphyService
      .getTrends()
      .then(tags => {
        this.tags = tags
      })
  }
  onFavDelete(fav) {
    this.favs = fav;
  }
}

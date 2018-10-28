import { Component } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";
import { Router } from '@angular/router';
import { Gifs, Tags, Favs } from "../shared/giphy.model";

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
  favs: Favs[];
  constructor(
    private giphyService: GiphyService,
    private router: Router
  ) {

  }
  ngOnInit() {
    if (localStorage.getItem('capstone_token')) {
      this.isLogged = true;
      this.giphyService.getUser().subscribe((user) => {
        this.favs = user['user'].favorites
      })
    }
    this.loading = true
    this.giphyService
      .getGiphies()
      .subscribe(entries => {
        this.loading = false
        this.gifs = entries['randGifs']
      })
    this.giphyService
      .getTrends()
      .subscribe(tags => {
        this.tags = tags['trends']
      })
  }
  onFavDelete(fav) {
    this.favs = fav;
  }
}

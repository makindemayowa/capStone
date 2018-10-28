import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiphyService } from "../shared/giphy.service";
import { Gifs } from "../shared/giphy.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchText: string = "";
  gifs: Gifs[];
  loading: boolean = false;
  notFound: boolean = false;
  searchQuery: string = "";
  isLogged: boolean = false;
  newfav;

  constructor(
    private route: ActivatedRoute,
    private giphyService: GiphyService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('capstone_token')) {
      this.isLogged = true;
    }
    this.route.queryParamMap.subscribe(params => {
      const searchParams = { ...params.keys, ...params };
      this.searchQuery = searchParams['params'].q;
      if (this.searchQuery) {
        this.searchGif();
      }
    });
  }

  addFav() {
    const postData = {
      query: this.searchQuery,
      searchTerm: this.searchQuery.split(' ').join('')
    }
    this.giphyService.addFavorite(postData).subscribe((user) => {
      return this.newfav = user
    })
  }

  searchGif() {
    this.loading = true
    this.giphyService.searchGiphies(this.searchQuery).subscribe((result) => {
      this.gifs = result['result'];
      if (!this.gifs.length) {
        this.notFound = true;
      }
      this.loading = false
      return this.gifs
    })
  }
}

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
      this.searchQuery = searchParams.params.q;
      if (this.searchQuery) {
        this.loading = true
        this.giphyService.searchGiphies(this.searchQuery).then((result) => {
          if (!result.length) {
            this.notFound = true;
          }
          this.loading = false
          this.gifs = result
        })
      }
    });
  }

  addFav() {
    const postData = {
      query: this.searchQuery,
      searchTerm: this.searchQuery.split(' ').join('')
    }
    this.giphyService.addFavorite(postData).then((user) => {
    })
  }
}

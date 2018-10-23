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
  gifs: Gifs[]

  constructor(
    private route: ActivatedRoute,
    private giphyService: GiphyService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const searchParams = { ...params.keys, ...params };
      const searchQuery = searchParams.params.q;
      if (searchQuery) {
        this.giphyService.searchGiphies(searchQuery).then((result) => {
          this.gifs = result
        })
      }
    });
  }
}

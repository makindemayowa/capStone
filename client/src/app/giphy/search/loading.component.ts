import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiphyService } from "../shared/giphy.service";
import { Gifs } from "../shared/giphy.model";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./search.component.scss']
})
export class LoadingComponent {
  searchText: string = "";
  gifs: Gifs[]

  constructor(
    private route: ActivatedRoute,
    private giphyService: GiphyService
  ) { }
}

import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavComponent {
  @Input() fav: {};
  @Output() onDelete = new EventEmitter<[{query: string, searchTerm: string}]>();
  updatedFavs: [{query: string, searchTerm: string}];
  constructor(
    private giphyService: GiphyService
  ) { }

  removeFav() {
    this.giphyService.removeFavorite(this.fav).subscribe((res) => {
      this.updatedFavs = res['updatedUser'].favorites;
      this.onDelete.emit(this.updatedFavs);
    })
  }
}

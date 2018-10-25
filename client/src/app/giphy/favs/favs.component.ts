import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavComponent {
  @Input() fav: {};
  @Output() onDelete = new EventEmitter<{query: string, searchTerm: string}>();
  constructor(
    private giphyService: GiphyService
  ) { }

  removeFav() {
    this.giphyService.removeFavorite(this.fav).then((res) => {
      this.onDelete.emit(res.favorites);
    })
  }
}

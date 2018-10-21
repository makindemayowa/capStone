import { Component } from '@angular/core';
import { GiphyService } from "../shared/giphy.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private giphyService: GiphyService) {

  }
  ngOnInit() {
    this.giphyService
      .getEntries()
      .then(entries => console.log('entries', entries))
  }
}

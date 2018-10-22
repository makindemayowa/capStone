import { Component, Input } from '@angular/core';
import { Gifs } from "../shared/giphy.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() gif: Gifs
}

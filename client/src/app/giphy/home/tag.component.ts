import { Component, Input } from '@angular/core';
import { Tags } from "../shared/giphy.model";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
})
export class TagComponent {
  @Input() tag: Tags
}

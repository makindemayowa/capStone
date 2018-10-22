import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchText: string = "";
  @ViewChild('searchForm') searchForm: NgForm

  onSearchSubmit() {
    console.log('========>', this.searchText)
  }
}

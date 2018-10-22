import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  searchText: string = "";
  @ViewChild('searchForm') searchForm: NgForm

  onSearchSubmit() {
    console.log('========>', this.searchText)
  }
}

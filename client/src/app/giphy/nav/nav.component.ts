import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  searchText: string = "";
  @ViewChild('searchForm') searchForm: NgForm

  constructor(private router: Router) {

  }
  onSearchSubmit() {
    const searchText = this.searchText;
    this.searchText = '';
    this.router.navigate(['/search'], { queryParams: { q: searchText } });
  }
}

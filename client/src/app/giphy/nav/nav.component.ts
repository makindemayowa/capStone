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
  isLogged: boolean = false;

  @ViewChild('searchForm') searchForm: NgForm
  constructor(private router: Router) {

  }

  ngDoCheck() {
    if(localStorage.getItem('capstone_token')) {
      return this.isLogged = true;
    }
  }

  onSearchSubmit() {
    const searchText = this.searchText;
    this.searchText = '';
    this.router.navigate(['/search'], { queryParams: { q: searchText } });
    return searchText
  }

  logout() {
    localStorage.removeItem('capstone_token')
    this.router.navigate(['/']);
    return this.isLogged = false;
  }
}

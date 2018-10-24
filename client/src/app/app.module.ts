import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  NavComponent,
  CardComponent,
  GiphyService,
  SearchComponent,
  TagComponent,
  AuthComponent,
  LoadingComponent
} from './giphy';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '*',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CardComponent,
    SearchComponent,
    TagComponent,
    AuthComponent,
    LoadingComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [
    GiphyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

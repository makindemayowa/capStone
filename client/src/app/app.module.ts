import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  NavComponent,
  CardComponent,
  GiphyService,
  SearchComponent,
  TagComponent,
  AuthComponent,
  LoadingComponent,
  AuthGuard,
  AuthInterceptor,
  FavComponent
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
  {
    path: 'favorites',
    component: HomeComponent,
    canActivate: [AuthGuard] 
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
    LoadingComponent,
    FavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    GiphyService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

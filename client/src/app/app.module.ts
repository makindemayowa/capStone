import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent, NavComponent, CardComponent, GiphyService  } from './giphy';

const appRoutes: Routes = [
  { path: 'trial', component: AppComponent },
  {
    path: 'heroes',
    component: AppComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CardComponent,
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

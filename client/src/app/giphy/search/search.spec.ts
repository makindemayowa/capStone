import { TestBed, async } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GiphyService } from "../shared/giphy.service";
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component;
  let fixture;
  let favs
  beforeEach(async(() => {
    const giphyService = jasmine.createSpyObj('GiphyService', ['searchGiphies', 'addFavorite']);
    favs = { result: [{ imgUrl: 'fijifjififf', title: 'another' }] };
    giphyService.searchGiphies.and.returnValue(of(favs));
    giphyService.addFavorite.and.returnValue(of(favs));
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
      ],
      providers: [
        { provide: GiphyService, useValue: giphyService }
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should set gifs when searchGifs is called', () => {
    expect(component.gifs).toBeUndefined();
    component.searchGif();
    expect(component.gifs).toBeTruthy();
  });

  it('Should return a new gif if addFav is called', () => {
    expect(component.newfav).toBeUndefined();
    component.addFav()
    expect(component.newfav).toEqual(favs);
  });
});

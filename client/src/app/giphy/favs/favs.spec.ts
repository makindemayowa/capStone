import { TestBed } from '@angular/core/testing';
import { FavComponent } from './favs.component';
import { GiphyService } from "../shared/giphy.service";
import { of } from 'rxjs';

describe('AppComponent', () => {
  let comp;
  let fav = { updatedUser: { favorites: { query: 'hfhv', searchTerm: 'Test' } } };

  beforeEach(() => {
    const giphyService = jasmine.createSpyObj('GiphyService', ['removeFavorite']);
    giphyService.removeFavorite.and.returnValue(of(fav));
    TestBed.configureTestingModule({
      providers: [
        FavComponent,
        { provide: GiphyService, useValue: giphyService }
      ]
    });
    comp = TestBed.get(FavComponent);
  });

  it('raises the selected event when removeFav is called', () => {
    expect(comp.updatedFavs).toBeFalsy();
    comp.removeFav()
    expect(comp.updatedFavs).toEqual(fav.updatedUser.favorites);
  });
});

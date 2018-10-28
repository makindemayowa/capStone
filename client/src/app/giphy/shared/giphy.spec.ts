import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GiphyService } from './giphy.service';
import { Gifs, Tags, Favs } from "./giphy.model";

describe('GiphyService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  describe('getGiphies()', () => {
    it('should return an Observable<Array<Gif>>',
      inject([GiphyService], (giphyService) => {
        const testData: Gifs[] = [{ title: 'Test Data', imgUrl: 'fvjnfvjnjvnjnjc' }];
        giphyService.getGiphies().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne('http://localhost:4000/api/randomGiphy');
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })

  describe('searchGiphies()', () => {
    it('should return an Observable<Array<Gif>>',
      inject([GiphyService], (giphyService) => {
        const testData: Gifs[] = [{ title: 'Test Data', imgUrl: 'fvjnfvjnjvnjnjc' }];
        const query = 'something'
        giphyService.searchGiphies(query).subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/search?q=${query}`);
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })

  describe('getTrends()', () => {
    it('should return an Observable<Array<Tags>>',
      inject([GiphyService], (giphyService) => {
        const testData: Tags[] = [{ title: 'Test Data', query: 'fvjnfvjnjvnjnjc' }];
        giphyService.getTrends().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/trends`);
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })

  describe('requestSignup()', () => {
    it('should return an Observable<Array<User>>',
      inject([GiphyService], (giphyService) => {
        const testData = { jsonToken: 'duvnvjcjc.dhvhvc.jshbdc' };
        giphyService.requestSignup().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/signup`);
        expect(req.request.method).toEqual('POST');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })

  describe('requestLogin()', () => {
    it('should return an Observable<<User>>',
      inject([GiphyService], (giphyService) => {
        const testData = { jsonToken: 'duvnvjcjc.dhvhvc.jshbdc' };
        giphyService.requestLogin().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/login`);
        expect(req.request.method).toEqual('POST');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })

  describe('addFavorite()', () => {
    it('should return an Observable<<User>>',
      inject([GiphyService], (giphyService) => {
        const testData = { jsonToken: 'duvnvjcjc.dhvhvc.jshbdc' };
        giphyService.addFavorite().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/favorite`);
        expect(req.request.method).toEqual('POST');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })


  describe('removeFavorite()', () => {
    it('should return an Observable<<User>>',
      inject([GiphyService], (giphyService) => {
        const testData = { jsonToken: 'duvnvjcjc.dhvhvc.jshbdc' };
        giphyService.removeFavorite().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/favorite`);
        expect(req.request.method).toEqual('PUT');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })

  describe('getUser()', () => {
    it('should return an Observable<<User>>',
      inject([GiphyService], (giphyService) => {
        const testData = { jsonToken: 'duvnvjcjc.dhvhvc.jshbdc' };
        giphyService.getUser().subscribe((giphies) => {
          return expect(giphies).toEqual(testData)
        })
        const req = httpTestingController.expectOne(`http://localhost:4000/api/user`);
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();
      })
    )
  })
})

import { TestBed, async } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let comp;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        NavComponent,
      ],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NavComponent,
      ],
    }).compileComponents();
    comp = TestBed.get(NavComponent);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return a search text if onSearchSubmit is called', () => {
    expect(comp.searchText).toEqual('');
    comp.searchText = 'search query'
    expect(comp.onSearchSubmit()).toEqual('search query');
  });
});

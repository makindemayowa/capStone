import { TestBed, async } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {
  let component;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Setting enabled to false disables the submit button', () => {
    component.gif = { imgUrl: 'fjvnjfnvjnf', title: 'dhvhchc' };
    const imgEl = fixture.debugElement.query(By.css('img'));
    fixture.detectChanges();
    expect(imgEl.properties.src).toEqual(component.gif.imgUrl);
  });
});

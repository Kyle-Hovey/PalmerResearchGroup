import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './homePage.component';

describe('homePageComponent', () => {
  let component: homePageComponent;
  let fixture: ComponentFixture<homePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ homePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(homePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

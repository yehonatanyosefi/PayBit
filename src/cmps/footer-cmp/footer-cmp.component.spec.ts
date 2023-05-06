import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCmpComponent } from './footer-cmp.component';

describe('FooterCmpComponent', () => {
  let component: FooterCmpComponent;
  let fixture: ComponentFixture<FooterCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

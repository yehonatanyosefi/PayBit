import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendFilterComponent } from './friend-filter.component';

describe('FriendFilterComponent', () => {
  let component: FriendFilterComponent;
  let fixture: ComponentFixture<FriendFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendIndexComponent } from './friend-index.component';

describe('FriendIndexComponent', () => {
  let component: FriendIndexComponent;
  let fixture: ComponentFixture<FriendIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

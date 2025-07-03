import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBreachIconsComponent } from './user-breach-icons.component';

describe('UserBreachIconsComponent', () => {
  let component: UserBreachIconsComponent;
  let fixture: ComponentFixture<UserBreachIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBreachIconsComponent]
    });
    fixture = TestBed.createComponent(UserBreachIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

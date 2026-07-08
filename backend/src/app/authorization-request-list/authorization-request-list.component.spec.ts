import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationRequestListComponent } from './authorization-request-list.component';

describe('AuthorizationRequestListComponent', () => {
  let component: AuthorizationRequestListComponent;
  let fixture: ComponentFixture<AuthorizationRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorApproveAuthorizationComponent } from './moderator-approve-authorization.component';

describe('ModeratorApproveAuthorizationComponent', () => {
  let component: ModeratorApproveAuthorizationComponent;
  let fixture: ComponentFixture<ModeratorApproveAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorApproveAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorApproveAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

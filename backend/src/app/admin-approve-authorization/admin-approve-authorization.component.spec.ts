import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveAuthorizationComponent } from './admin-approve-authorization.component';

describe('AdminApproveAuthorizationComponent', () => {
  let component: AdminApproveAuthorizationComponent;
  let fixture: ComponentFixture<AdminApproveAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApproveAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

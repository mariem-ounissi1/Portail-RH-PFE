import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovePersonalChangeRequestComponent } from './admin-approve-personal-change-request.component';

describe('AdminApprovePersonalChangeRequestComponent', () => {
  let component: AdminApprovePersonalChangeRequestComponent;
  let fixture: ComponentFixture<AdminApprovePersonalChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApprovePersonalChangeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApprovePersonalChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

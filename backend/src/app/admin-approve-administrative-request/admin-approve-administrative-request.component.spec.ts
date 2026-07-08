import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveAdministrativeRequestComponent } from './admin-approve-administrative-request.component';

describe('AdminApproveAdministrativeRequestComponent', () => {
  let component: AdminApproveAdministrativeRequestComponent;
  let fixture: ComponentFixture<AdminApproveAdministrativeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveAdministrativeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApproveAdministrativeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

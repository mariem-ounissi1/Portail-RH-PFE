import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationsListComponentComponent } from './leave-applications-list-component.component';

describe('LeaveApplicationsListComponentComponent', () => {
  let component: LeaveApplicationsListComponentComponent;
  let fixture: ComponentFixture<LeaveApplicationsListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApplicationsListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveApplicationsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

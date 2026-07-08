import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorApproveLeaveComponent } from './moderator-approve-leave.component';

describe('ModeratorApproveLeaveComponent', () => {
  let component: ModeratorApproveLeaveComponent;
  let fixture: ComponentFixture<ModeratorApproveLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorApproveLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorApproveLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

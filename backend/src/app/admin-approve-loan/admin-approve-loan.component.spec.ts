import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveLoanComponent } from './admin-approve-loan.component';

describe('AdminApproveLoanComponent', () => {
  let component: AdminApproveLoanComponent;
  let fixture: ComponentFixture<AdminApproveLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApproveLoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminApproveLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

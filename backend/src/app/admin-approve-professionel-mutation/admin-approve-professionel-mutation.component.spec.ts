import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveProfessionelMutationComponent } from './admin-approve-professionel-mutation.component';

describe('AdminApproveProfessionelMutationComponent', () => {
  let component: AdminApproveProfessionelMutationComponent;
  let fixture: ComponentFixture<AdminApproveProfessionelMutationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveProfessionelMutationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApproveProfessionelMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

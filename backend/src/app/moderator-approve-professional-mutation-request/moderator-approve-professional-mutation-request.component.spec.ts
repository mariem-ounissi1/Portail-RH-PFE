import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorApproveProfessionalMutationRequestComponent } from './moderator-approve-professional-mutation-request.component';

describe('ModeratorApproveProfessionalMutationRequestComponent', () => {
  let component: ModeratorApproveProfessionalMutationRequestComponent;
  let fixture: ComponentFixture<ModeratorApproveProfessionalMutationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorApproveProfessionalMutationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorApproveProfessionalMutationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

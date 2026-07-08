import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalMutationRequestComponent } from './professional-mutation-request.component';

describe('ProfessionalMutationRequestComponent', () => {
  let component: ProfessionalMutationRequestComponent;
  let fixture: ComponentFixture<ProfessionalMutationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalMutationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalMutationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

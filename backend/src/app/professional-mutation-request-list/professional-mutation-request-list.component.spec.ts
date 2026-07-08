import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalMutationRequestListComponent } from './professional-mutation-request-list.component';

describe('ProfessionalMutationRequestListComponent', () => {
  let component: ProfessionalMutationRequestListComponent;
  let fixture: ComponentFixture<ProfessionalMutationRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalMutationRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalMutationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

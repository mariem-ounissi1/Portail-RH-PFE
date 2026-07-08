import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalChangeRequestComponent } from './personal-change-request.component';

describe('PersonalChangeRequestComponent', () => {
  let component: PersonalChangeRequestComponent;
  let fixture: ComponentFixture<PersonalChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalChangeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

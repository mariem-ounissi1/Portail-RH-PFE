import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalChangeRequestListComponent } from './personal-change-request-list.component';

describe('PersonalChangeRequestListComponent', () => {
  let component: PersonalChangeRequestListComponent;
  let fixture: ComponentFixture<PersonalChangeRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalChangeRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalChangeRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeRequestListeComponent } from './administrative-request-liste.component';

describe('AdministrativeRequestListeComponent', () => {
  let component: AdministrativeRequestListeComponent;
  let fixture: ComponentFixture<AdministrativeRequestListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeRequestListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativeRequestListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

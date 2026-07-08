import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeRequestComponent } from './administrative-request.component';

describe('AdministrativeRequestComponent', () => {
  let component: AdministrativeRequestComponent;
  let fixture: ComponentFixture<AdministrativeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

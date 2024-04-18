import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCompanyComponent } from './footer-company.component';

describe('FooterCompanyComponent', () => {
  let component: FooterCompanyComponent;
  let fixture: ComponentFixture<FooterCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCompanyComponent]
    });
    fixture = TestBed.createComponent(FooterCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

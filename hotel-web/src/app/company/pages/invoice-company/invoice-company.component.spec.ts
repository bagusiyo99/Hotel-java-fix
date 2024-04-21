import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCompanyComponent } from './invoice-company.component';

describe('InvoiceCompanyComponent', () => {
  let component: InvoiceCompanyComponent;
  let fixture: ComponentFixture<InvoiceCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceCompanyComponent]
    });
    fixture = TestBed.createComponent(InvoiceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDasbhboardComponent } from './company-dasbhboard.component';

describe('CompanyDasbhboardComponent', () => {
  let component: CompanyDasbhboardComponent;
  let fixture: ComponentFixture<CompanyDasbhboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDasbhboardComponent]
    });
    fixture = TestBed.createComponent(CompanyDasbhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

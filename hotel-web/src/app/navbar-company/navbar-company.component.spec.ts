import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCompanyComponent } from './navbar-company.component';

describe('NavbarCompanyComponent', () => {
  let component: NavbarCompanyComponent;
  let fixture: ComponentFixture<NavbarCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCompanyComponent]
    });
    fixture = TestBed.createComponent(NavbarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

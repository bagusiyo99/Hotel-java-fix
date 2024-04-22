import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesananComponent } from './pesanan.component';

describe('PesananComponent', () => {
  let component: PesananComponent;
  let fixture: ComponentFixture<PesananComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PesananComponent]
    });
    fixture = TestBed.createComponent(PesananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticelsComponent } from './all-articels.component';

describe('AllArticelsComponent', () => {
  let component: AllArticelsComponent;
  let fixture: ComponentFixture<AllArticelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllArticelsComponent]
    });
    fixture = TestBed.createComponent(AllArticelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

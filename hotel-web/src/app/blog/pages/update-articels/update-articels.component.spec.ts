import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticelsComponent } from './update-articels.component';

describe('UpdateArticelsComponent', () => {
  let component: UpdateArticelsComponent;
  let fixture: ComponentFixture<UpdateArticelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateArticelsComponent]
    });
    fixture = TestBed.createComponent(UpdateArticelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

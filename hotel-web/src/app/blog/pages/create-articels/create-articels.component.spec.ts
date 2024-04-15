import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticelsComponent } from './create-articels.component';

describe('CreateArticelsComponent', () => {
  let component: CreateArticelsComponent;
  let fixture: ComponentFixture<CreateArticelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArticelsComponent]
    });
    fixture = TestBed.createComponent(CreateArticelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

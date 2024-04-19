import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostinganComponent } from './postingan.component';

describe('PostinganComponent', () => {
  let component: PostinganComponent;
  let fixture: ComponentFixture<PostinganComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostinganComponent]
    });
    fixture = TestBed.createComponent(PostinganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

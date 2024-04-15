import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDasbhboardComponent } from './client-dasbhboard.component';

describe('ClientDasbhboardComponent', () => {
  let component: ClientDasbhboardComponent;
  let fixture: ComponentFixture<ClientDasbhboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDasbhboardComponent]
    });
    fixture = TestBed.createComponent(ClientDasbhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

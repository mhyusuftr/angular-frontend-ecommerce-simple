import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrderComponent } from './main-order.component';

describe('MainOrderComponent', () => {
  let component: MainOrderComponent;
  let fixture: ComponentFixture<MainOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainOrderComponent]
    });
    fixture = TestBed.createComponent(MainOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

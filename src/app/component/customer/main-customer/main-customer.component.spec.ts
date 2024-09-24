import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCustomerComponent } from './main-customer.component';

describe('MainCustomerComponent', () => {
  let component: MainCustomerComponent;
  let fixture: ComponentFixture<MainCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCustomerComponent]
    });
    fixture = TestBed.createComponent(MainCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

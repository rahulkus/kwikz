import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpostsComponent } from './carposts.component';

describe('CarpostsComponent', () => {
  let component: CarpostsComponent;
  let fixture: ComponentFixture<CarpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

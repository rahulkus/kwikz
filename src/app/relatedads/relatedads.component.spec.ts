import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedadsComponent } from './relatedads.component';

describe('RelatedadsComponent', () => {
  let component: RelatedadsComponent;
  let fixture: ComponentFixture<RelatedadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

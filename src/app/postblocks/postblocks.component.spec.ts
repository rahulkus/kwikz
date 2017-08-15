import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostblocksComponent } from './postblocks.component';

describe('PostblocksComponent', () => {
  let component: PostblocksComponent;
  let fixture: ComponentFixture<PostblocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostblocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostblocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationWrapperComponent } from './animation-wrapper.component';

describe('AnimationWrapperComponent', () => {
  let component: AnimationWrapperComponent;
  let fixture: ComponentFixture<AnimationWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

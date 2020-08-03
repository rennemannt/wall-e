import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadTiltComponent } from './head-tilt.component';

describe('HeadTiltComponent', () => {
  let component: HeadTiltComponent;
  let fixture: ComponentFixture<HeadTiltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadTiltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadTiltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogContainerComponent } from './backlog-container.component';

describe('BacklogContainerComponent', () => {
  let component: BacklogContainerComponent;
  let fixture: ComponentFixture<BacklogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

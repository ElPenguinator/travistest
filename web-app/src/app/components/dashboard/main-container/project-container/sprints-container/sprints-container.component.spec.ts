import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsContainerComponent } from './sprints-container.component';

describe('SprintsContainerComponent', () => {
  let component: SprintsContainerComponent;
  let fixture: ComponentFixture<SprintsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

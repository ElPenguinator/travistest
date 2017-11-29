import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsBarComponent } from './projects-bar.component';

describe('ProjectsBarComponent', () => {
  let component: ProjectsBarComponent;
  let fixture: ComponentFixture<ProjectsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

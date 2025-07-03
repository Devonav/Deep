import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { Project } from './projects';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  const mockProjects: Project[] = [
    {
      id: 1,
      name: 'Test Project 1',
      description: 'Test Description 1',
      imageUrl: 'test1.jpg',
      githubUrl: 'https://github.com/test1',
      websiteUrl: 'https://test1.com'
    },
    {
      id: 2,
      name: 'Test Project 2',
      description: 'Test Description 2',
      imageUrl: 'test2.jpg',
      githubUrl: 'https://github.com/test2',
      npm: 'https://npmjs.com/test2'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    component.projects = mockProjects; // Assign test data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display projects', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.project').length)
      .toBe(mockProjects.length);
  });
});
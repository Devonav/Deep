import { ComponentFixture, TestBed } from '@angular/core/testing';

// FIXED: The path now correctly points to the 'projects' folder
import { Project } from '../projects/projects'; 
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCardComponent]
    });
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    
    // Provide mock data for the test
    component.project = { name: 'Test Project', image: '', github: '', website: '', npm: '' };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { Project } from '../projects/projects'; // Import your Project interface/type

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  projects: Project[] = []; // Initialize with your projects data
  
  constructor() {
    // Load your projects data here or from a service
    this.projects = [
      // Your project objects here
    ];
  }
}
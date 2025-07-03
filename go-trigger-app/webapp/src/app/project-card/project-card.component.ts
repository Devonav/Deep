// src/app/project-card/project-card.component.ts

import { Component, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Project } from '../projects/projects'; // Assuming you have a Project model

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  // This @Input() allows you to pass the project data into the component
  @Input() project!: Project;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // The HostListener must be attached to a method within the class
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.renderer.setStyle(card, '--mouse-x', `${x}px`);
    this.renderer.setStyle(card, '--mouse-y', `${y}px`);
  }
}
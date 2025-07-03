import { Component, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Project, projects } from './projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Input() projects!: Project[];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
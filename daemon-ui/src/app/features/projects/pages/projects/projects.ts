import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { Project } from '../../../../core/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';

import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {
private cdr = inject(ChangeDetectorRef);
  private projectService = inject(ProjectService);

  projects: Project[] = [];

  totalProjects = 0;
  activeProjects = 0;
  completedProjects = 0;
  pausedProjects = 0;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {

  console.log("Loading Projects...");

  this.projectService.getProjects().subscribe({

    next: (response: any) => {

      console.log("Response:", response);

      this.projects = response.data.projects;
this.cdr.detectChanges();
      console.log("Projects:", this.projects);

      this.totalProjects = this.projects.length;

      this.activeProjects =
        this.projects.filter(p => p.status === 'Active').length;

      this.completedProjects =
        this.projects.filter(p => p.status === 'Completed').length;

      this.pausedProjects =
        this.projects.filter(p => p.status === 'Paused').length;

      console.log("Finished Loading");

    },

    error: (err) => {

      console.error("API ERROR", err);

    }

  });

}
}
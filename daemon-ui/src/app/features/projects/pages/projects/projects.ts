import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Project } from '../../../../core/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {

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

    this.projectService.getProjects().subscribe({

      next: (response) => {

        this.projects = response.data.projects;

        this.totalProjects = this.projects.length;

        this.activeProjects =
          this.projects.filter(p => p.status === 'Active').length;

        this.completedProjects =
          this.projects.filter(p => p.status === 'Completed').length;

        this.pausedProjects =
          this.projects.filter(p => p.status === 'Paused').length;

      },

      error: (error) => console.error(error)

    });

  }

}
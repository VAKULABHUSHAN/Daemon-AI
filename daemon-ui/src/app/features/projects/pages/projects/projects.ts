import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Project } from '../../../../core/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { ToastComponent } from '../../../../shared/components/toast/toast';

interface ProjectsResponse {
  data: {
    projects: Project[];
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    ToastComponent
  ],
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {

  private projectService = inject(ProjectService);

  // ============================
  // Projects
  // ============================

  projects: Project[] = [];

  totalProjects = 0;
  activeProjects = 0;
  completedProjects = 0;
  pausedProjects = 0;

  // ============================
  // Project Panel
  // ============================

  showProjectPanel = false;

  isEditMode = false;

  selectedProjectId = '';

  newProject: Partial<Project> = {
    name: '',
    description: '',
    status: 'Active'
  };

  // ============================
  // Toast
  // ============================

  showToast = false;

  toastMessage = '';

  toastType: 'success' | 'error' | 'warning' | 'info' = 'success';

  // ============================
  // Init
  // ============================

  ngOnInit(): void {
    this.loadProjects();
  }

  // ============================
  // Load Projects
  // ============================

  loadProjects(): void {

    this.projectService.getProjects().subscribe({

      next: (response: ProjectsResponse) => {

        this.projects = response.data.projects ?? [];

        this.updateStats();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  // ============================
  // Statistics
  // ============================

  private updateStats(): void {

    this.totalProjects = this.projects.length;

    this.activeProjects =
      this.projects.filter(p => p.status === 'Active').length;

    this.completedProjects =
      this.projects.filter(p => p.status === 'Completed').length;

    this.pausedProjects =
      this.projects.filter(p => p.status === 'Paused').length;

  }

  // ============================
  // Panel
  // ============================

  openProjectPanel() {

    this.isEditMode = false;

    this.selectedProjectId = '';

    this.newProject = {
      name: '',
      description: '',
      status: 'Active'
    };

    this.showProjectPanel = true;

  }

  closeProjectPanel() {

    this.showProjectPanel = false;

    this.isEditMode = false;

    this.selectedProjectId = '';

    this.newProject = {
      name: '',
      description: '',
      status: 'Active'
    };

  }

  // ============================
  // Edit
  // ============================

  editProject(project: Project) {

    this.isEditMode = true;

    this.selectedProjectId = project._id!;

    this.newProject = {

      name: project.name,

      description: project.description,

      status: project.status

    };

    this.showProjectPanel = true;

  }

  // ============================
  // Save
  // ============================

  saveProject() {

    if (!this.newProject.name?.trim()) {

      this.showNotification(
        'Project name is required',
        'warning'
      );

      return;

    }

    if (this.isEditMode) {

      this.projectService.updateProject(

        this.selectedProjectId,

        this.newProject

      ).subscribe({

        next: () => {

          this.closeProjectPanel();

          this.loadProjects();

          this.showNotification(
            'Project updated successfully',
            'success'
          );

        },

        error: () => {

          this.showNotification(
            'Failed to update project',
            'error'
          );

        }

      });

    } else {

      this.projectService.createProject(
        this.newProject as Project
      ).subscribe({

        next: () => {

          this.closeProjectPanel();

          this.loadProjects();

          this.showNotification(
            'Project created successfully',
            'success'
          );

        },

        error: () => {

          this.showNotification(
            'Failed to create project',
            'error'
          );

        }

      });

    }

  }
deleteProject() {

  if (!this.selectedProjectId) {

    this.showNotification(
      'No project selected',
      'warning'
    );

    return;

  }

  const confirmed = confirm(
    'Delete this project?\n\nThis action cannot be undone.'
  );

  if (!confirmed) {
    return;
  }

  this.projectService
    .deleteProject(this.selectedProjectId)
    .subscribe({

      next: () => {

        this.closeProjectPanel();

        this.loadProjects();

        this.showNotification(
          'Project deleted successfully',
          'success'
        );

      },

      error: () => {

        this.showNotification(
          'Failed to delete project',
          'error'
        );

      }

    });

}
  // ============================
  // Toast
  // ============================

  showNotification(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) {

    this.toastMessage = message;

    this.toastType = type;

    this.showToast = true;

    setTimeout(() => {

      this.showToast = false;

    }, 3000);

  }

}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Project } from '../models/project.model';

interface ProjectsResponse {
  data: {
    projects: Project[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl;

  getProjects(): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(
      `${this.baseUrl}${API_ENDPOINTS.PROJECTS}`
    );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(
      `${this.baseUrl}${API_ENDPOINTS.PROJECTS}/${id}`
    );
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(
      `${this.baseUrl}${API_ENDPOINTS.PROJECTS}`,
      project
    );
  }

  updateProject(id: string, project: Partial<Project>): Observable<any> {
    return this.http.put(
      `${this.baseUrl}${API_ENDPOINTS.PROJECTS}/${id}`,
      project
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}${API_ENDPOINTS.PROJECTS}/${id}`
    );
  }
}
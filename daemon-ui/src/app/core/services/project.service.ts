import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
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

  private readonly api = `${environment.apiUrl}/projects`;

  getProjects(): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(this.api);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.api}/${id}`);
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(this.api, project);
  }

  updateProject(id: string, project: Partial<Project>): Observable<any> {
    return this.http.put(`${this.api}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

}
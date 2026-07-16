import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private http = inject(HttpClient);

  private readonly api = `${environment.apiUrl}/projects`;

  getProjects(): Observable<any> {
    return this.http.get(this.api);
  }

  getProject(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
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
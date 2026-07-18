import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/workspace`;

  getWorkspace(): Observable<any> {
    return this.http.get(this.api);
  }

  openProject(projectId: string): Observable<any> {
    return this.http.put(`${this.api}/open/${projectId}`, {});
  }

}
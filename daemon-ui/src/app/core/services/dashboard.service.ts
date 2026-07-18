import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api.constants';

export interface DashboardStats {
  projects: number;
  knowledge: number;
  conversations: number;
  models: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl;

  getStats(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${API_ENDPOINTS.DASHBOARD}/stats`
    );
  }

  getActivity(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${API_ENDPOINTS.DASHBOARD}/activity`
    );
  }

  getStatus(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${API_ENDPOINTS.DASHBOARD}/status`
    );
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API, API_ENDPOINTS } from '../constants/api.constants';

interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    response: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private http = inject(HttpClient);

  sendMessage(message: string): Observable<ChatResponse> {

    return this.http.post<ChatResponse>(
      API.BASE_URL + API_ENDPOINTS.CHAT,
      {
        message
      }
    );

  }

}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API, API_ENDPOINTS } from '../constants/api.constants';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private http = inject(HttpClient);

  getConversations(): Observable<any> {
    return this.http.get(
      `${API.BASE_URL}${API_ENDPOINTS.CONVERSATIONS}`
    );
  }

}
import { Injectable } from '@angular/core';

import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {

  conversations: Conversation[] = [];

  selectedConversation: Conversation | null = null;

  messages: Message[] = [];

  currentMessage = '';

  isThinking = false;

  isLoading = false;

  clearChat(): void {

    this.selectedConversation = null;

    this.messages = [];

    this.currentMessage = '';

    this.isThinking = false;

  }

}
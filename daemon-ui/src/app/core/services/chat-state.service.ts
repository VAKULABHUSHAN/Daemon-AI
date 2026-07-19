import { Injectable } from '@angular/core';

export interface ChatMessage {
  role: 'assistant' | 'user';
  message: string;
  time: string;
}

export interface Conversation {

  id: string;

  title: string;

  createdAt: Date;

  messages: ChatMessage[];

}

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {

  conversations: Conversation[] = [];

  currentConversation!: Conversation;

  currentMessage = '';

  isThinking = false;

  constructor() {

    const conversation: Conversation = {

      id: crypto.randomUUID(),

      title: 'New Conversation',

      createdAt: new Date(),

      messages: [

        {

          role: 'assistant',

          message:
            "👋 Hello Vakul! I'm Daemon, your local AI development assistant.\n\nWhat are we building today?",

          time: 'Now'

        }

      ]

    };

    this.currentConversation = conversation;

    this.conversations.push(conversation);

  }

  get messages(): ChatMessage[] {

    return this.currentConversation.messages;

  }

  set messages(value: ChatMessage[]) {

    this.currentConversation.messages = value;

  }

  updateTitle(firstPrompt: string): void {

    if (this.currentConversation.title !== 'New Conversation') return;

    this.currentConversation.title =
      firstPrompt.length > 40
        ? firstPrompt.substring(0, 40) + '...'
        : firstPrompt;

  }

  clearConversation(): void {

    this.currentConversation.messages = [

      {

        role: 'assistant',

        message:
          "👋 Hello Vakul! I'm Daemon, your local AI development assistant.\n\nWhat are we building today?",

        time: 'Now'

      }

    ];

    this.currentMessage = '';

    this.isThinking = false;

    this.currentConversation.title = 'New Conversation';

  }

}
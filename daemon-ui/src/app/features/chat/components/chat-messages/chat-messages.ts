import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageBubble } from '../message-bubble/message-bubble';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [
    CommonModule,
    MessageBubble
  ],
  templateUrl: './chat-messages.html'
})
export class ChatMessages {

  messages = [
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?'
    },
    {
      role: 'user',
      content: 'Explain Angular Signals.'
    }
  ];

}
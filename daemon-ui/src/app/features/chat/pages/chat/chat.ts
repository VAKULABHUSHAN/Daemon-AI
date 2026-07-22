import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationSidebar } from '../../components/conversation-sidebar/conversation-sidebar';
import { ChatWindow } from '../../components/chat-window/chat-window';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ConversationSidebar,
    ChatWindow
  ],
  templateUrl: './chat.html'
})
export class Chat {}
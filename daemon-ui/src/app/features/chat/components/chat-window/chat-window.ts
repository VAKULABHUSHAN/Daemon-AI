import { Component } from '@angular/core';

import { ChatHeader } from '../chat-header/chat-header';
import { ChatMessages } from '../chat-messages/chat-messages';
import { ChatInput } from '../chat-input/chat-input';
import { QuickActions } from '../quick-actions/quick-actions';
import { EmptyState } from '../empty-state/empty-state';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    ChatHeader,
    ChatMessages,
    ChatInput,
    QuickActions,
    EmptyState
  ],
  templateUrl: './chat-window.html'
})
export class ChatWindow {

  hasMessages = true;

}
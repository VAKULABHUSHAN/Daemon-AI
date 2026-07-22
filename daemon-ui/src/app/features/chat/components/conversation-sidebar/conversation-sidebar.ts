import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Conversation } from '../../../../core/models/conversation.model';
import { ConversationService } from '../../../../core/services/conversation.service';

@Component({
  selector: 'app-conversation-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-sidebar.html'
})
export class ConversationSidebar implements OnInit {

  private conversationService = inject(ConversationService);

  conversations: Conversation[] = [];

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {

    this.conversationService.getConversations().subscribe({

      next: (response) => {

  console.log('API Response:', response);

  console.log('Conversations:', response.data.conversations);

  this.conversations = response.data.conversations;

},

      error: (error) => {

        console.error(error);

      }

    });

  }

}
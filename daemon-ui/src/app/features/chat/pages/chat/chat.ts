import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatService } from '../../../../core/services/chat.service';
import {
  ChatStateService
} from '../../../../core/services/chat-state.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.html'
})
export class Chat implements AfterViewInit {

  private cdr = inject(ChangeDetectorRef);

  private chatService = inject(ChatService);

  state = inject(ChatStateService);

  @ViewChild('conversationContainer')
  conversationContainer!: ElementRef<HTMLDivElement>;

  sendMessage(): void {

    if (this.state.isThinking) return;

    const text = this.state.currentMessage.trim();
this.state.updateTitle(text);
    if (!text) return;

    this.state.messages = [
      ...this.state.messages,
      {
        role: 'user',
        message: text,
        time: 'Now'
      }
    ];

    this.state.currentMessage = '';

    this.state.isThinking = true;

    this.cdr.detectChanges();

    this.scrollToBottom();

    this.chatService.sendMessage(text).subscribe({

      next: (res) => {

        this.state.messages = [
          ...this.state.messages,
          {
            role: 'assistant',
            message: res.data.response,
            time: 'Now'
          }
        ];

        this.state.isThinking = false;

        this.cdr.detectChanges();

        this.scrollToBottom();

      },

      error: (err) => {

        this.state.messages = [
          ...this.state.messages,
          {
            role: 'assistant',
            message:
              err?.error?.message ||
              '❌ Unable to communicate with Daemon AI.',
            time: 'Now'
          }
        ];

        this.state.isThinking = false;

        this.cdr.detectChanges();

        this.scrollToBottom();

      }

    });

  }

  onKeyDown(event: KeyboardEvent): void {

    if (event.key === 'Enter' && !event.shiftKey) {

      event.preventDefault();

      this.sendMessage();

    }

  }

  fillPrompt(prompt: string): void {

    this.state.currentMessage = prompt;

  }

  ngAfterViewInit(): void {

    this.scrollToBottom();

  }

  private scrollToBottom(): void {

    setTimeout(() => {

      if (this.conversationContainer) {

        this.conversationContainer.nativeElement.scrollTop =
          this.conversationContainer.nativeElement.scrollHeight;

      }

    });

  }

}
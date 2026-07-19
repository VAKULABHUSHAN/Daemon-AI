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

interface ChatMessage {
  role: 'assistant' | 'user';
  message: string;
  time: string;
}

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
@ViewChild('conversationContainer')
conversationContainer!: ElementRef<HTMLDivElement>;

  currentMessage = '';

  isThinking = false;

  messages: ChatMessage[] = [
    {
      role: 'assistant',
      message:
        "👋 Hello Vakul! I'm Daemon, your local AI development assistant.\n\nWhat are we building today?",
      time: 'Now'
    }
  ];

  sendMessage(): void {

    if (this.isThinking) return;

    const text = this.currentMessage.trim();

    if (!text) return;

    this.messages = [
      ...this.messages,
      {
        role: 'user',
        message: text,
        time: 'Now'
      }
    ];

    this.currentMessage = '';

    this.isThinking = true;

    this.cdr.detectChanges();
    this.scrollToBottom();
    setTimeout(() => {

      this.messages = [
        ...this.messages,
        {
          role: 'assistant',
          message:
            "This is a dummy response. Once we connect Ollama, you'll receive real AI responses here.",
          time: 'Now'
        }
      ];

      this.isThinking = false;

      this.cdr.detectChanges();
      this.scrollToBottom();
    }, 800);

  }

  onKeyDown(event: KeyboardEvent): void {

    if (event.key === 'Enter' && !event.shiftKey) {

      event.preventDefault();

      this.sendMessage();

    }

  }

  fillPrompt(prompt: string): void {

    this.currentMessage = prompt;

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
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-bubble.html'
})
export class MessageBubble {

  @Input({ required: true })
  message!: {
    role: string;
    content: string;
  };

}
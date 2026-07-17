import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent {

  @Input() show = false;

  @Input() message = '';

  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';

}
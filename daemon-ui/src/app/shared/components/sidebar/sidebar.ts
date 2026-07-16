import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  navItems = [
  { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
  { label: 'Projects', route: '/projects', icon: 'folder' },
  { label: 'Knowledge', route: '/knowledge', icon: 'library_books' },
  { label: 'Agents', route: '/agents', icon: 'smart_toy' },
  { label: 'Settings', route: '/settings', icon: 'settings' }
];
}
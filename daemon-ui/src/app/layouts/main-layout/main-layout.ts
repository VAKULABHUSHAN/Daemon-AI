import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { StatusbarComponent } from '../../shared/components/statusbar/statusbar';
import { TopbarComponent } from '../../shared/components/topbar/topbar';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, TopbarComponent, StatusbarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {}

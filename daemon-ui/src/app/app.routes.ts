import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';
import { AgentsComponent } from './features/agents/pages/agents/agents';
import { KnowledgeComponent } from './features/knowledge/pages/knowledge/knowledge';
import { ProjectsComponent } from './features/projects/pages/projects/projects';
import { SettingsComponent } from './features/settings/pages/settings/settings';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},

{
  path: 'dashboard',
  component: DashboardComponent
},

{
  path: 'projects',
  component: ProjectsComponent
},

{
  path: 'chat',
  loadComponent: () =>
    import('./features/chat/pages/chat/chat')
      .then(m => m.Chat)
},

{
  path: 'knowledge',
  component: KnowledgeComponent
},

{
  path: 'agents',
  component: AgentsComponent
},

{
  path: 'settings',
  component: SettingsComponent
}

]
  },
];
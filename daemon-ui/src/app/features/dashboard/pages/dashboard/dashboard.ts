import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { Project } from '../../../../core/models/project.model';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


interface QuickAction {
  icon: string;
  title: string;
  description: string;
}

interface ActivityEvent {
  timeframe: string;
  title: string;
  description: string;
}

interface SystemService {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  label: string;
}

interface MetaMetric {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  public recentProjects: Project[] = [];
  private subscription: Subscription = new Subscription();
  
  public currentTime: string = '';
  public currentDate: string = '';
  private clockIntervalId: any;

  public stats = {
    projects: 0,
    models: 4,
    knowledge: 12,
    chats: 48
  };

  public quickActions: QuickAction[] = [
    { icon: 'bi-plus-circle', title: 'New Project', description: 'Initialize an isolated local workspace environment.' },
    { icon: 'bi-terminal', title: 'AI Chat', description: 'Open context-aware chat with your local AI engine.' },
    { icon: 'bi-file-earmark-arrow-up', title: 'Knowledge', description: 'Ingest local documentation files and directories into vectors.' },
    { icon: 'bi-sliders', title: 'Settings', description: 'Configure model orchestrator parameters and global variables.' }
  ];

  public timeline: ActivityEvent[] = [];

  public services: SystemService[] = [];

  public metaMetrics: MetaMetric[] = [
    { label: 'Version', value: 'v0.2.0' },
    { label: 'Storage', value: 'MongoDB' },
    { label: 'AI Engine', value: 'Offline' },
    { label: 'Platform', value: 'Electron' }
  ];

constructor(
  private dashboardService: DashboardService,
  private cdr: ChangeDetectorRef
) {}
 
ngOnInit(): void {
  this.updateClock();

  this.clockIntervalId = setInterval(
    () => this.updateClock(),
    1000
  );

  this.loadDashboard();
}
private loadDashboard(): void {

  this.subscription.add(

    forkJoin({
      stats: this.dashboardService.getStats(),
      activity: this.dashboardService.getActivity(),
      status: this.dashboardService.getStatus()
      
    }).subscribe({

      next: ({ stats, activity, status }) => {
console.log("Timeline:", this.timeline);
        // Stats
        this.stats.projects = stats.data.projects;
        this.stats.models = stats.data.models;
        this.stats.knowledge = stats.data.knowledge;
        this.stats.chats = stats.data.conversations;
console.log("Timeline:", this.timeline);
        // Activity
        console.log("Raw Activity:", activity.data);

const mappedTimeline = activity.data.map((item: any) => ({
  timeframe: item.time,
  title: item.title,
  description: item.description
}));

console.log("Mapped Timeline:", mappedTimeline);

this.timeline = mappedTimeline;

console.log("Assigned Timeline:", this.timeline);

        // Status
        const s = status.data;

        this.services = [
          {
            name: 'API Server',
            status: s.api.status.toLowerCase() as any,
            label: s.api.message
          },
          {
            name: 'MongoDB',
            status: s.mongodb.status.toLowerCase() as any,
            label: s.mongodb.message
          },
          {
            name: 'Electron',
            status: s.electron.status.toLowerCase() as any,
            label: s.electron.message
          },
          {
            name: 'Ollama',
            status: s.ollama.status.toLowerCase() as any,
            label: s.ollama.message
          }
        ];
        this.cdr.detectChanges();
console.log("Services:", this.services);
      },

      error: (err) => {
        console.error(err);
      }

    })

  );
 

}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
  }

  private updateClock(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { hour12: false });
    this.currentDate = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }

  public onActionClick(actionTitle: string): void {
    // Production interface handler stub
  }
}
export type ProjectStatus = 'Active' | 'Completed' | 'Paused';

export interface Project {
  _id?: string;

  name: string;

  description: string;

  status: ProjectStatus;

  createdAt?: string;

  updatedAt?: string;
}
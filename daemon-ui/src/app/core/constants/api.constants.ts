import { environment } from '../../../environments/environment';

export const API = {
  BASE_URL: environment.apiUrl,
};

export const API_ENDPOINTS = {
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  CHAT: '/chat',
  KNOWLEDGE: '/knowledge',
  AGENTS: '/agents',
  SETTINGS: '/settings',
};
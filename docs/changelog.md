# v0.1.0

## Added

- Angular workspace
- Electron workspace
- Initial routing
- Main layout
- Sidebar
- Topbar
- Statusbar
- Documentation

## Fixed

- Bootstrap Icons workspace resolution

## Planned

- Dashboard redesign
- Project management

# Changelog

## v0.2.0 - Day 2 Backend Foundation

### Added
- Express backend setup
- MongoDB connection using Mongoose
- Project CRUD APIs
- Global error handling middleware
- Async request handler
- Standard API response and error utilities
- Project status constants

### Improved
- Refactored controllers to use asyncHandler
- Standardized API response format
- Cleaner backend architecture

### Tested
- Create Project API
- Get All Projects API
- Get Project By ID API
- Update Project API
- Delete Project API

# v0.3.0 - Day 3 Project Management Module

## Added

- Project management UI
- Project statistics dashboard
- Create Project side drawer
- Edit Project using shared drawer
- Delete Project functionality
- Shared Toast notification component
- Form validation for project creation
- Automatic project refresh after CRUD operations
- Dynamic Create/Edit project workflow

## Improved

- Reused single drawer for both Create and Edit operations
- Professional project management workflow
- Live project statistics updates
- Better project card interactions
- Cleaner Angular component structure
- Improved overall user experience

## Fixed

- Project statistics refresh issue
- Project list rendering after CRUD operations
- Project panel state management
- Form reset after Create and Update
- Dynamic project loading synchronization

## Tested

- Create Project
- View Projects
- Edit Project
- Delete Project
- Toast Notifications
- Live Statistics Updates

## v0.3.0 - Day 4 Workspace Engine

### Added
- Workspace module architecture
- Workspace MongoDB model
- Workspace controller
- Workspace routes
- Workspace API service in Angular
- Active workspace management
- Open Project functionality
- Workspace persistence using MongoDB
- Backend APIs for retrieving and updating the active workspace

### Improved
- Dashboard now consumes backend APIs for:
  - Workspace statistics
  - Recent activity
  - System health
- Dashboard data loading using RxJS `forkJoin`
- Project cards now include an **Open** action
- Toast notification when switching active workspace

### Backend
- Added `GET /workspace`
- Added `PUT /workspace/open/:projectId`
- Automatic workspace document creation on first launch
- Active project population using MongoDB references

### Frontend
- Created `WorkspaceService`
- Connected Projects page with Workspace APIs
- Integrated workspace switching from the UI
- Improved project workflow for future AI context support

### Planned
- Knowledge Management module
- File & folder import
- Workspace-specific document storage
- Local document indexing
- AI knowledge retrieval pipeline
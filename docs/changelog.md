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

## v0.4.0 - Day 4 Workspace Engine

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

# v0.5.0 - Day 5 AI Chat Integration

## Added

- AI Chat page UI
- Quick action prompt cards
- ChatService for backend communication
- ChatStateService for state management
- Conversation model
- Automatic conversation title generation
- AI thinking indicator
- Auto-scroll to latest message
- Enter-to-send keyboard shortcut
- Environment-based API configuration
- Real-time communication with Ollama

## Improved

- Refactored chat architecture
- Separated UI state from API communication
- Centralized API endpoint management
- Improved code organization for future multi-chat support

## Backend

- Added Chat API endpoint
- Added Ollama service integration
- Connected Express backend with local Ollama instance

## Status

✅ Angular ↔ Express ↔ Ollama communication working successfully.

Next milestone:
- Multi-conversation support
- Conversation persistence
- Project Context Engine


# v0.6.0 - Day 6 Conversation Engine

## Added

- Conversation MongoDB model
- Message MongoDB model
- Conversation CRUD APIs
- Message CRUD APIs
- Conversation and Message controllers
- Conversation and Message routes
- Persistent conversation storage
- Persistent message storage
- Multi-conversation backend support

## Improved

- Refactored Chat API to use conversation-based workflow
- Integrated Ollama Chat API (`/api/chat`) for multi-turn conversations
- Added conversation history support for contextual AI responses
- Automatic conversation creation for new chats
- Automatic message persistence for both user and AI responses
- Conversation sorting using `updatedAt`

## Fixed

- Enabled context-aware AI conversations
- Added cascade deletion of messages when deleting a conversation
- Improved backend architecture for future streaming and memory features

## Tested

- Create Conversation
- Get All Conversations
- Get Conversation By ID
- Delete Conversation
- Create Message
- Get Messages
- Delete Message
- New Chat API
- Existing Conversation API
- Context-aware multi-turn conversations

## Next Goal

- Build Angular Conversation Service
- Create Conversation and Message models in Angular
- Implement conversation sidebar
- Add New Chat functionality
- Load and switch between conversations
- Display persisted chat history
- Connect frontend with Conversation Engine APIs
- Complete end-to-end multi-conversation workflow

# v0.7.0 - Day 7 Chat Architecture Refactor (In Progress)

## Added

- Refactored Chat module structure
- Created separated chat components:
  - Chat Header
  - Chat Window
  - Conversation Sidebar
- Prepared Angular architecture for conversation-based workflow

## Improved

- Started migration from single chat flow to conversation-based architecture
- Improved component separation
- Prepared frontend structure for persistent conversations

## Fixed

- Fixed initial chat component organization issues
- Improved folder structure for future chat features

## Known Issues

- Chat UI is not receiving AI responses
- Conversation API integration is incomplete
- Message persistence is not connected to frontend
- Sidebar conversation loading is not functional
- End-to-end chat workflow needs restoration

## Current Status

⚠️ Chat system is under refactor.

Backend conversation engine is available,
but frontend chat response flow is currently broken.

## Next Goal

- Restore working AI chat response flow
- Connect ChatService with new conversation APIs
- Verify Angular → Express → Ollama → Angular pipeline
- Complete conversation switching
- Restore stable chat experience
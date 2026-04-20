# HaloMD

HaloMD is a web app for turning project ideas into structured markdown documentation. Users answer a guided wizard, and the app generates markdown content in real time on a split screen.

## About

HaloMD helps people describe a project once and turn that input into organized markdown files. Instead of writing documentation from scratch, users can answer a guided set of questions and immediately see the result take shape.

## Why This Exists

Many projects start with scattered notes, chat messages, or rough ideas. HaloMD is meant to make that first documentation step easier by giving users a simple flow that produces clean, shareable markdown.

## Stack

- Web framework: Next.js
- Database: Firebase
- Authentication: Firebase Google Auth

## Purpose

- Make it easy to capture project details in a simple wizard
- Generate markdown documentation while the user is filling in the form
- Show the input flow and the generated `.md` output side by side

## Main Features

1. Google login
2. Guided input wizard
3. Real-time markdown preview
4. Multiple document sections such as `overview.md`, `design.md`, and `rules.md`
5. Split-screen layout for input and output

## Screens

### 1. Input Screen

The first screen asks about the project through a step-by-step wizard.

### 2. Output Screen

The second screen shows the generated markdown, which can be split into multiple files or sections.

## Wizard Sections

The wizard is designed mainly for software development docs, so it should ask for the information people usually need to plan, build, ship, and maintain an app.

All fields in the wizard are optional. The form should be complete enough to cover a full software project, but users can skip any field they do not want to fill in.

### App Details

- Project Name
- Short Description
- Main Goal
- Target Users
- Project Status

### Product Scope

- Core Features
- Key User Flows
- Main Use Cases
- Non-Goals
- Success Criteria

### Design

- Theme
- Typography
- Color Style
- Layout Style
- Motion / Interaction Style
- Accessibility Notes

### Technical Setup

- Tech Stack
- Database or Storage
- Authentication
- Hosting / Deployment
- Integrations
- Environment Variables

### Architecture

- System Overview
- Main Modules
- Folder Structure
- State Management
- Data Flow
- Component Structure

### Data Structure

- Main Entities
- Important Fields
- Relationships
- Content Sections
- File or Document Naming

### API and Integrations

- API Endpoints
- External Services
- Webhooks
- Request and Response Shapes
- Error Handling

### Behavior

- Screens
- Wizard Steps
- Empty States
- Error States
- Loading States

### Rules

- Validation Rules
- Content Rules
- Formatting Rules
- Accessibility Rules
- Document Rules
- Special Instructions

### Testing

- Test Strategy
- Unit Tests
- Integration Tests
- Manual QA
- Edge Cases

### Deployment

- Deployment Platform
- Build Steps
- Release Process
- Environment Setup
- Monitoring / Logging

### Security

- Authentication Rules
- Access Control
- Sensitive Data Handling
- Validation and Sanitization
- Security Notes

### Maintenance

- Contributing
- Troubleshooting
- FAQ
- Roadmap
- Open Questions

### Output Documents

- Overview
- Design Document
- Architecture Document
- API Document
- Rules or Guidelines
- Setup Guide
- Testing Guide
- Deployment Guide
- FAQ
- Roadmap

## v1 Roadmap

1. Build the authentication flow
2. Create the wizard for collecting project details
3. Generate markdown live as the user fills in answers
4. Support multiple output sections
5. Refine the split-screen experience

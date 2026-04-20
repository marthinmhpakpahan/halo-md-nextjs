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

The wizard is designed mainly for software development docs.

All fields are optional. Users can skip anything they do not know yet.

### App Details

- Project Name
- Short Description
- Main Goal
- Target Users

### Product Scope

- Core Features
- Key User Flows

### Technical Setup

- Tech Stack
- Database or Storage
- Authentication
- Hosting / Deployment
- Environment Variables

### Architecture

- System Overview
- Main Modules
- Data Flow

### Rules

- Validation Rules
- Formatting Rules
- Content Rules
- Special Instructions

### Output Documents

- Overview
- Design Document
- Architecture Document
- Rules or Guidelines
- Setup Guide
- Roadmap

## v1 Roadmap

1. Build the authentication flow
2. Create the wizard for collecting project details
3. Generate markdown live as the user fills in answers
4. Support multiple output sections
5. Refine the split-screen experience

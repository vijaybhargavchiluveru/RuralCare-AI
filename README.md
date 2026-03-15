<div align="center">

```
RURALCARE AI
```

### Bridging the Healthcare Divide — One Village at a Time

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

**A modern, AI-powered telemedicine platform** that connects rural patients with doctors — no long journeys, no waiting rooms. Built with a full-stack TypeScript architecture and Google Gemini AI.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Quick Start](#quick-start)
- [Future Roadmap](#future-roadmap)
- [Team](#team)

---

## Overview

**RuralCare** is a web-based telemedicine platform designed to connect rural patients with doctors in real time. In regions where hospitals are scarce, RuralPulse acts as a digital bridge — delivering remote consultations, AI-assisted health support, and role-based medical management from anywhere.

---

## Core Features

**Telemedicine Consultation** — Patients connect with licensed doctors remotely through a live, intuitive consultation interface.

**Multi-Role System** — Three distinct roles with tailored dashboards:

| Role | Capabilities |
|------|-------------|
| Patient | Book consultations, view history, access telemedicine |
| Doctor | Manage patient queue, conduct consultations, update records |
| Admin | Oversee platform, manage users, control system settings |

**AI Integration** — Powered by the Google Gemini API for intelligent medical assistance, triage support, and context-aware health guidance.

**Secure Authentication** — Role-based login via `AuthContext` ensures users only access what they're authorized for.

**Real-Time Medical Interface** — The Telemedicine page is the core consultation hub where doctors and patients interact live.

---

## Architecture

```
CLIENT LAYER
  React + TypeScript + TailwindCSS
  Vite Build System
        |
        | HTTP Requests
        v
SERVER LAYER
  Node.js + Express.js (server.ts)
  TSX Runtime
        |
        | API Calls
        v
AI LAYER
  Google Gemini API (@google/genai)
```

### Application Pages

| Page | Description |
|------|-------------|
| Landing Page | Platform introduction and entry point |
| Login | Secure authentication for all roles |
| Patient Dashboard | View consultations, access telemedicine |
| Doctor Dashboard | Manage patient consultations and records |
| Admin Dashboard | Full system administration and control |
| Telemedicine | Core real-time consultation interface |

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, TypeScript, React Router, TailwindCSS, Recharts, Motion, Lucide React |
| Backend | Node.js, Express.js, TSX Runtime |
| AI | Google Gemini API, @google/genai |
| Tooling | Vite, TypeScript |

---

## Folder Structure

```
RuralPulse/
├── src/
│   ├── components/             # Reusable UI components
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── Login.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── DoctorDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── Telemedicine.tsx
│   ├── context/                # AuthContext and global state
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.local                  # Not committed — add API key here
```

---

## Quick Start

**Prerequisites:** Node.js v20+, Google Gemini API key ([get one here](https://ai.google.dev))

```bash
# 1. Clone the repo
git clone https://github.com/your-org/ruralpulse.git
cd ruralpulse

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Future Roadmap

- [ ] Video consultation integration
- [ ] AI medical diagnosis assistance
- [ ] Electronic Health Records (EHR)
- [ ] Mobile application (iOS & Android)
- [ ] Offline rural clinic sync
- [ ] Health analytics dashboard

---

## Team

| Member | Role |
|--------|------|
| Vijay Ch | Developer |
| Srinivas Reddy | Developer |
| Aarif Basha | Developer |
| Jayvardhan Reddy | Developer |

---

<div align="center">

**RuralPulse** — Empowering Rural Healthcare Through Technology

</div>

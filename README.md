# CivicSafe

CivicSafe is an evidence-based civic reporting and analytics platform that enables citizens to report environmental and civic issues with photographic proof. The platform collects verified civic data and transforms it into meaningful insights for transparency, monitoring, and data-driven governance.

---

# Project Vision

Most civic complaint systems are slow, opaque, and difficult to use. CivicSafe aims to build a modern, transparent, and data-driven alternative where citizens can easily report issues and communities can monitor civic conditions through analytics and public dashboards.

The long-term goal of CivicSafe is to become a **civic intelligence system** that collects, verifies, and analyzes urban environmental issues.

---

# Core Features

### Evidence-Based Reporting

Users submit civic issues along with photo evidence. Each report receives a unique case ID for tracking.

### Image Compression and Storage

Uploaded images are automatically compressed in the browser and stored in cloud storage to reduce bandwidth and storage usage.

### Public Civic Dashboard

Reports and statistics will be visualized through a public dashboard showing trends, categories, and resolution status.

### Verification Workflow

Reports are reviewed and marked as verified, rejected, or resolved to ensure authenticity and prevent misuse.

### Data Analytics

Collected data will be used to generate insights such as pollution hotspots, issue trends, and response efficiency.

---

# Current System Architecture

```
Citizen
   │
   │ Submit Report + Image
   ▼
Next.js Frontend
   │
   │ Image Compression
   ▼
Supabase Storage
   │
   │ Image URL
   ▼
API Endpoint (/api/report)
   │
   ▼
Supabase Database
   │
   ├ Dashboard
   ├ Analytics
   └ Map Visualization
```

---

# Technology Stack

Frontend
Next.js (React Framework)

Backend
Next.js API Routes

Database
Supabase (PostgreSQL)

Storage
Supabase Storage

Image Processing
Browser Image Compression

Version Control
Git + GitHub

---

# Project Structure

```
civicsafe/
│
├ app/
│   ├ api/
│   │   └ report/
│   │       └ route.ts
│   └ report/
│       └ page.tsx
│
├ components/
│   └ ImageUploader.tsx
│
├ lib/
│   ├ supabaseClient.ts
│   └ uploadImage.ts
│
├ public/
├ README.md
├ package.json
```

---

# Development Roadmap

## Phase 1 – Infrastructure (Completed)

* Project initialization
* Supabase integration
* Database schema creation
* API endpoints

## Phase 2 – Evidence-Based Reporting (Completed)

* Report submission page
* Image upload and compression
* Cloud storage integration
* Case ID generation

## Phase 3 – Public Dashboard (In Progress)

* Report listing interface
* Statistics overview
* Evidence preview
* Status indicators

## Phase 4 – Verification System

* Moderator review panel
* Approval / rejection workflow
* Verification tagging

## Phase 5 – Analytics Platform

* Data visualization
* Issue category analysis
* Time-based trends
* Resolution metrics

## Phase 6 – Geographic Visualization

* Interactive map of civic issues
* Hotspot detection
* Location-based filtering

## Phase 7 – Social Media Integration

* Detect civic issues from public social media posts
* Convert posts into structured reports

---

# How to Run the Project

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Open the application

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

# Contribution

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a new feature branch
3. Make changes
4. Submit a pull request

---

# Future Goals

* Civic issue heat maps
* Automated social media monitoring
* AI-assisted issue classification
* City-level environmental analytics
* Transparency reports for civic authorities

---

# License

This project is currently under development.

---

# Author

Developed by Ga as a civic technology and data analytics project focused on building a transparent and evidence-driven civic monitoring system.

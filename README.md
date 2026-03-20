# CivicSafe

CivicSafe is a platform for pollution reporting through social media or website with great analytical power, it enables citizens to report environmental and civic issues with photographic proof and location verification on portal or through simple social media post. The platform collects verified civic data and transforms it into meaningful insights for transparency, monitoring, and data-driven governance.

---

# Project Vision

Most civic complaint systems are slow, opaque, and difficult to use. CivicSafe aims to build a modern, transparent, and data-driven alternative where citizens can easily report issues and communities can monitor civic conditions through analytics and public dashboards.

The long-term goal of CivicSafe is to become a **civic intelligence system** that collects, verifies, and analyzes urban environmental issues through verified evidence and location-aware reporting.

---

# Core Features

### Evidence-Based Reporting

Users submit civic issues along with photo evidence. Each report receives a unique case ID for tracking and verification.

### Location Verification

Reports include location information either by:

* manually entering the location
* using the **“Use My Location”** feature
* submitting geo-tagged images captured at the location

This ensures reports are tied to real-world locations.

### Image Compression and Storage

Uploaded images are automatically compressed in the browser and stored in cloud storage to reduce bandwidth and storage usage while maintaining sufficient quality for evidence verification.

### Social Media Reporting Integration

CivicSafe will support civic reporting through social media platforms. Users can report issues by:

* posting a **geo-tagged image**
* tagging the CivicSafe account in a **story or post**
* including location information with visual evidence

These reports can be detected and converted into structured CivicSafe reports after verification.

Evidence and location are mandatory for social media submissions to prevent misuse and ensure credibility.

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

Future extension:

```
Social Media Post
   │
   │ Geo-tagged image + tag
   ▼
CivicSafe Social Monitor
   │
   ▼
Verification Pipeline
   │
   ▼
Reports Database
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
* Convert geo-tagged social media posts into CivicSafe reports
* Evidence and location validation pipeline

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# CivicSafe
a pollution reporting platform with analytical power and social media reporting.
>>>>>>> cf946cd4d0bfdaabdcf748da0438479463c69ded

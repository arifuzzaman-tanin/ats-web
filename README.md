# ATS Resume Scanner

Production-oriented React + TypeScript resume scanner UI inspired by the provided reference screens.

## Stack

- React, TypeScript, Vite
- React Router
- SCSS
- Axios
- React Hook Form + Zod
- TanStack Query
- Zustand
- Lucide React
- Vitest + React Testing Library

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Routes

- `/` - Resume scanner page
- `/analysis` - Analysis result page

Opening `/analysis` without analysis data redirects the user back to the scanner flow.

## Backend API

The scanner posts resume text and job description to:

```http
POST http://localhost:5000/extract_skills
Content-Type: application/json
```

```json
{
  "access_key": "ARIF_100",
  "job_description": "We need a Python developer with Flask and Docker.",
  "resume": "I am a Python developer with Flask experience."
}
```

Axios configuration lives in `src/services/apiClient.ts`, and endpoint constants live in `src/services/endpoints.ts`.

## Architecture

- `src/app` - Providers, router, query client
- `src/components/ui` - Reusable UI primitives
- `src/features/resume-scanner` - Scanner inputs, validation, file text extraction adapter
- `src/features/resume-analysis` - API integration, response normalization, score/status/skills UI
- `src/features/resume-optimization` - Prompt generation, AI optimization abstraction, export abstraction
- `src/store` - Zustand workflow state
- `src/styles` - SCSS tokens, base styles, component styles, page styles
- `src/types` - Shared domain models

## Notes

PDF/DOC/DOCX parsing is intentionally isolated in `resumeTextExtractor.ts`. The current frontend accepts TXT directly and exposes a clear adapter point for backend or vetted client-side parsing.

AI optimization and DOCX/PDF export are also isolated behind service interfaces so they can later connect to OpenAI, Gemini, Claude, a custom backend, or server-side document generation.

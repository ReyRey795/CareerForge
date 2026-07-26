# CareerForge

CareerForge is an AI-powered web application that helps job seekers build stronger applications by comparing resumes against job descriptions, identifying skill gaps, and generating tailored application materials.

The project is being built from the ground up as a portfolio application to demonstrate modern software engineering practices, including React, TypeScript, component architecture, state management, backend API integration, and AI-powered development.

---

## Current Features

- Upload or paste a resume
- Paste a job description
- Mock resume analysis workflow
- Reusable React component architecture
- State management using React Hooks
- Responsive user interface built with React and TypeScript

---

## Planned Features

- AI-powered resume analysis
- Resume-to-job description comparison
- Skill gap identification
- Resume improvement suggestions
- Tailored cover letter generation
- ATS-friendly recommendations
- User authentication
- Personal dashboard for saved analyses

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend (Planned)

- FastAPI
- Python
- OpenAI API

---

## Current Architecture

```text
src/
├── components/
│   ├── ActionButton.tsx
│   ├── Header.tsx
│   ├── ResumeUpload.tsx
│   └── JobDescription.tsx
│
├── App.tsx
```

CareerForge currently follows a component-based architecture where `App.tsx` serves as the single source of truth for application state. Resume and job description data are managed in the parent component and passed to child components through props, creating a predictable one-way data flow.

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ReyRey795/CareerForge.git
```

Navigate to the frontend project:

```bash
cd CareerForge/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser at:

```text
http://localhost:5173
```

---

## Roadmap

- [x] Initial React + TypeScript setup
- [x] Landing page
- [x] Reusable component architecture
- [x] Resume input component
- [x] Job description input component
- [x] React state management
- [x] Mock resume analysis workflow
- [ ] Resume file upload
- [ ] Resume comparison engine
- [ ] Backend API integration
- [ ] AI-powered resume analysis
- [ ] Cover letter generation
- [ ] Authentication
- [ ] User dashboard

---

## Development Philosophy

CareerForge is being developed incrementally, with each feature built using software engineering best practices rather than simply making the application work.

Current development focuses on:

- Building reusable React components
- Maintaining a clean project architecture
- Following a single source of truth for state management
- Writing maintainable and scalable TypeScript code
- Preparing the frontend for future backend and AI integration

---

## Why I Built CareerForge

I built CareerForge to strengthen my software engineering skills while solving a common challenge faced by job seekers: tailoring resumes to specific job descriptions.

Rather than following tutorials, I'm designing and implementing the application one feature at a time to gain practical experience with frontend architecture, state management, backend integration, and AI-powered application development.

The goal is to create a real-world portfolio project that demonstrates not only technical ability but also software engineering thought processes and best practices.

---

## Future Enhancements

- Resume scoring
- Multiple resume management
- AI interview preparation
- Company-specific application optimization
- Export tailored resumes
- Analytics dashboard
- Cloud deployment
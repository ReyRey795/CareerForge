# CareerForge

CareerForge is a resume analysis application designed to help job seekers strengthen their applications by comparing a resume against a job description, identifying skill gaps, calculating a match score, and generating targeted improvement suggestions.

This project is being built as part of my software engineering portfolio while I transition into software engineering. The goal is to develop a modern full-stack application while applying software engineering best practices throughout the development process.

---

## 🚧 Current Status

**Current Milestone:** Dynamic Resume Skill Analysis ✅

CareerForge can currently:

- Compare resume text against a job description
- Detect recognized technical skills required by the position
- Identify matching technical skills
- Identify missing technical skills
- Calculate a resume match percentage
- Categorize the result by match strength
- Generate dynamic improvement suggestions
- Display results in a responsive analysis dashboard

This project is actively under development, with new features being added incrementally.

---

## Features

### Current Features

- Paste resume text directly into the application
- Paste a target job description
- Analyze both documents using a predefined technical skill database
- Calculate a resume-to-job match score
- Display required, matching, and missing skills
- Generate suggestions based on the analysis results
- Display match categories:
  - Excellent Match
  - Good Match
  - Fair Match
  - Needs Improvement
- Character counters for both input sections
- Loading state during analysis
- Accessible match-score progress bar
- Responsive dark-themed interface
- Custom teal-and-gold technology-inspired design
- Reusable React component architecture

---

## Recognized Skills

The current skill-matching engine recognizes:

- React
- TypeScript
- JavaScript
- Python
- Java
- Git
- AWS
- Docker
- Agile

The skill library will continue to expand as the analysis engine develops.

---

## How It Works

1. The user enters resume text.
2. The user pastes a job description.
3. CareerForge checks the job description for recognized skills.
4. Skills found in the job description are treated as required skills.
5. CareerForge checks the resume for those required skills.
6. The application:
   - Identifies matching skills
   - Identifies missing skills
   - Calculates a match percentage
   - Assigns a match category
   - Generates personalized improvement suggestions
7. The results are displayed in an interactive analysis dashboard.

CareerForge uses word-boundary matching to prevent similar technology names from being incorrectly matched. For example, `Java` is not counted simply because `JavaScript` appears in the text.

---

## Dynamic Suggestions

CareerForge generates recommendations based on the analysis rather than displaying the same suggestions for every result.

Depending on the resume and job description, the application may recommend:

- Demonstrating missing skills through projects or experience
- Moving important matched skills higher on the resume
- Adding measurable accomplishments
- Strengthening examples for partially matched positions
- Tailoring the professional summary to a strong-match position
- Providing a more detailed job description when no recognized skills are found

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Planned Backend

- FastAPI
- Python
- OpenAI API

### Development Tools

- Git
- GitHub
- npm
- VS Code

---

## Project Structure

```text
CareerForge/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ActionButton.tsx
    │   │   ├── AnalysisResult.tsx
    │   │   ├── Header.tsx
    │   │   ├── JobDescription.tsx
    │   │   └── ResumeUpload.tsx
    │   ├── utils/
    │   │   └── analyzeResume.ts
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    └── package.json
```

---

## Planned Features

- Expand the recognized skill library
- Support skill aliases such as `Node.js` and `NodeJS`
- Support multi-word skills such as `REST APIs`
- Improve text normalization and skill matching
- Separate required and preferred qualifications
- Detect experience-level requirements
- Detect education and certification requirements
- AI-powered resume analysis
- ATS optimization recommendations
- Dynamic skill extraction to replace the predefined skill list
- Resume file uploads for PDF and Word documents
- Backend API using FastAPI
- User accounts and saved analyses
- Resume version tracking
- Job application dashboard
- Cover letter generation
- Automated testing
- Public deployment

---

## Current Limitations

CareerForge is still under active development.

The current analyzer:

- Uses a predefined list of recognized skills
- Relies on keyword matching
- Does not yet understand the context in which a skill is mentioned
- Does not distinguish between required and preferred qualifications
- Does not evaluate years of experience
- Does not currently process PDF or Word files
- Does not save previous analyses
- Does not yet use an external AI service or backend

A skill appearing in a resume does not necessarily prove professional experience with that skill. The current version only determines whether the recognized term appears in the provided text.

---

## What I've Learned

This project has strengthened my understanding of:

- React components
- Component communication through props
- State management with React hooks
- TypeScript types and interfaces
- Array methods
  - `filter()`
  - `includes()`
  - `map()`
- Regular expressions
- Separation of concerns
- Reusable utility functions
- Conditional rendering
- Dynamic recommendation logic
- Responsive design
- CSS Grid and Flexbox
- Accessible interface design
- Git workflow
- Debugging and testing

---

## Running the Project

Clone the repository:

```bash
git clone <repository-url>
```

Move into the frontend directory:

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

Open the local URL shown in the terminal, typically:

```text
http://localhost:5173
```

---

## Future Goals

CareerForge is intended to become a complete AI-powered career assistant capable of helping users:

- Optimize resumes
- Generate tailored cover letters
- Track job applications
- Prepare for interviews
- Improve ATS compatibility
- Save and compare different resume versions
- Receive job-specific application recommendations

---

## Author

**Reynaldo Serrano**

Army Veteran | Software Engineering Student | Aspiring Full-Stack Software Engineer

Building CareerForge one feature at a time while documenting the learning journey.
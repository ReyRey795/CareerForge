# CareerForge

CareerForge is a resume analysis application designed to help job seekers strengthen their applications by comparing a resume against a job description, identifying skill gaps, calculating a match score, and generating targeted improvement suggestions.

This project is being built as part of my software engineering portfolio while I transition into software engineering. The goal is to develop a modern full-stack application while applying software engineering best practices throughout the development process.

---

## 🚧 Current Status

**Current Milestone:** Skill Alias Matching and Automated Testing ✅

CareerForge can currently:

- Compare resume text against a job description
- Detect recognized technical skills required by a position
- Recognize multiple names for the same technology
- Support multi-word and punctuation-based skills
- Identify matching technical skills
- Identify missing technical skills
- Calculate a resume match percentage
- Categorize results by match strength
- Generate dynamic improvement suggestions
- Display results in a responsive analysis dashboard
- Validate the analysis engine with automated unit tests

This project is actively under development, with new features being added incrementally.

---

## Features

### Current Features

- Paste resume text directly into the application
- Paste a target job description
- Analyze both documents using a predefined technical skill database
- Recognize technology aliases such as:
  - `React.js` and `ReactJS`
  - `Node.js` and `NodeJS`
  - `AWS` and `Amazon Web Services`
  - `PostgreSQL` and `Postgres`
  - `C#` and `C Sharp`
- Support multi-word skills such as:
  - `REST APIs`
  - `Amazon Web Services`
- Support punctuation-based skills such as:
  - `.NET`
  - `C#`
  - `CI/CD`
  - `Node.js`
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
- Automated unit tests using Vitest

---

## Recognized Skills

The current skill-matching engine recognizes:

- React
- TypeScript
- JavaScript
- Node.js
- Python
- Java
- C#
- .NET
- FastAPI
- Git
- GitHub
- AWS
- Docker
- PostgreSQL
- SQL
- REST APIs
- CI/CD
- Agile
- Scrum

The skill library will continue to expand as the analysis engine develops.

---

## How It Works

1. The user enters resume text.
2. The user pastes a job description.
3. CareerForge checks the job description for recognized skills and aliases.
4. Skills found in the job description are treated as required skills.
5. CareerForge checks the resume for those required skills.
6. The application:
   - Identifies matching skills
   - Identifies missing skills
   - Calculates a match percentage
   - Assigns a match category
   - Generates personalized improvement suggestions
7. The results are displayed in an interactive analysis dashboard.

CareerForge uses regular expressions and boundary-aware matching to prevent similar technology names from being incorrectly detected.

For example:

- `Java` is not counted simply because `JavaScript` appears in the text.
- `AWS` and `Amazon Web Services` are displayed as the same skill.
- `React`, `React.js`, and `ReactJS` are displayed as `React`.

---

## Skill Alias Matching

Each recognized skill contains:

- A standard display name
- One or more accepted aliases

Example:

```ts
{
  name: 'AWS',
  aliases: ['AWS', 'Amazon Web Services'],
}
```

This allows CareerForge to recognize different ways employers and applicants may write the same technology while displaying one consistent result.

A job description containing:

```text
ReactJS, NodeJS, and Amazon Web Services
```

will display:

```text
React, Node.js, and AWS
```

---

## Dynamic Suggestions

CareerForge generates recommendations based on the analysis rather than displaying the same suggestions for every result.

Depending on the resume and job description, the application may recommend:

- Demonstrating missing skills through projects or professional experience
- Moving important matched skills higher on the resume
- Adding measurable accomplishments
- Strengthening examples for partially matched positions
- Tailoring the professional summary to a strong-match position
- Providing a more detailed job description when no recognized skills are found

---

## Automated Testing

CareerForge uses Vitest to test the resume analysis engine.

The current test suite verifies that the analyzer:

- Recognizes aliases and multi-word skills
- Does not incorrectly match `Java` inside `JavaScript`
- Matches skills regardless of capitalization
- Returns a score of zero when no recognized skills are found
- Generates the correct recommendation for strong matches

Run the tests once:

```bash
npm run test:run
```

Run the tests in watch mode:

```bash
npm test
```

Current test status:

```text
Test Files: 1 passed
Tests: 5 passed
```

---

## Quality Checks

Before changes are committed, the frontend can be checked with:

```bash
npm run lint
npm run test:run
npm run build
```

The current version passes:

- ESLint
- All automated tests
- TypeScript compilation
- Vite production build

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Testing

- Vitest

### Planned Backend

- FastAPI
- Python
- OpenAI API

### Development Tools

- Git
- GitHub
- npm
- VS Code
- ESLint

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
    │   │   ├── analyzeResume.ts
    │   │   └── analyzeResume.test.ts
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── package.json
    └── package-lock.json
```

---

## Planned Features

- Expand the recognized skill library
- Improve text normalization and skill matching
- Separate required and preferred qualifications
- Detect experience-level requirements
- Detect education and certification requirements
- Add input validation and reset functionality
- Add AI-powered resume analysis
- Add ATS optimization recommendations
- Replace the predefined skill list with dynamic skill extraction
- Support resume file uploads for PDF and Word documents
- Create a backend API using FastAPI
- Add user accounts and saved analyses
- Add resume version tracking
- Create a job application dashboard
- Generate tailored cover letters
- Expand automated test coverage
- Deploy the application publicly

---

## Current Limitations

CareerForge is still under active development.

The current analyzer:

- Uses a predefined list of recognized skills
- Relies on keyword and alias matching
- Does not yet understand the context in which a skill is mentioned
- Does not distinguish between required and preferred qualifications
- Does not evaluate years of experience
- Does not currently process PDF or Word files
- Does not save previous analyses
- Does not yet use an external AI service or backend

A skill appearing in a resume does not necessarily prove professional experience with that skill. The current version determines whether the recognized skill or one of its aliases appears in the provided text.

---

## What I've Learned

This project has strengthened my understanding of:

- React components
- Component communication through props
- State management with React hooks
- TypeScript types and custom data structures
- Array methods
  - `filter()`
  - `includes()`
  - `map()`
  - `some()`
- Regular expressions
- Escaping special regular-expression characters
- Skill alias matching
- Multi-word text matching
- Separation of concerns
- Reusable utility functions
- Conditional rendering
- Dynamic recommendation logic
- Responsive design
- CSS Grid and Flexbox
- Accessible interface design
- Unit testing with Vitest
- Regression testing
- Production build validation
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
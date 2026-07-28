# CareerForge

CareerForge is a resume analysis application designed to help job seekers strengthen their applications by comparing a resume against a job description, identifying skill gaps, calculating a weighted match score, and generating targeted improvement suggestions.

This project is being built as part of my software engineering portfolio while I transition into software engineering. The goal is to develop a modern full-stack application while applying software engineering best practices throughout the development process.

---

## 🚧 Current Status

**Current Milestone:** Required and Preferred Skill Classification ✅

CareerForge can currently:

- Compare resume text against a job description
- Detect recognized technical skills required by a position
- Separate required and preferred qualifications
- Calculate required and preferred skill scores
- Calculate a weighted overall match score
- Recognize multiple names for the same technology
- Support multi-word and punctuation-based skills
- Identify matching and missing skills
- Generate dynamic improvement suggestions
- Display results in a responsive analysis dashboard
- Validate the analysis engine with automated unit tests
- Validate missing user input
- Reset the application for a new analysis

This project is actively under development, with new features being added incrementally.

---

## Features

### Current Features

- Paste resume text directly into the application
- Paste a target job description
- Analyze both documents using a predefined technical skill database
- Detect required qualification sections
- Detect preferred qualification sections
- Recognize section headings such as:
  - `Required Qualifications`
  - `Required Skills`
  - `Requirements`
  - `Minimum Qualifications`
  - `Must Have`
  - `Preferred Qualifications`
  - `Preferred Skills`
  - `Nice to Have`
  - `Bonus Skills`
- Calculate separate required and preferred skill scores
- Calculate a weighted overall score
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
- Display required skills matched
- Display required skills missing
- Display preferred skills matched
- Display preferred skills missing
- Generate suggestions based on the analysis results
- Display match categories:
  - Excellent Match
  - Good Match
  - Fair Match
  - Needs Improvement
- Display character counters for both input sections
- Display a loading state during analysis
- Display accessible match-score progress bars
- Validate missing resume or job-description input
- Clear stale results when either document is edited
- Start a completely new analysis with one button
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
3. CareerForge divides the job description into general, required, and preferred sections.
4. The analyzer checks those sections for recognized skills and aliases.
5. Skills found under general or required sections are classified as required.
6. Skills found under preferred sections are classified as preferred.
7. If a skill appears in both categories, it is treated as required.
8. CareerForge checks the resume for each identified skill.
9. The application calculates:
   - Required skills matched
   - Required skills missing
   - Preferred skills matched
   - Preferred skills missing
   - Required skill score
   - Preferred skill score
   - Weighted overall match score
10. Recommendations are generated from the results.
11. The results are displayed in an interactive analysis dashboard.

CareerForge uses regular expressions and boundary-aware matching to prevent similar technology names from being incorrectly detected.

For example:

- `Java` is not counted simply because `JavaScript` appears in the text.
- `AWS` and `Amazon Web Services` are displayed as the same skill.
- `React`, `React.js`, and `ReactJS` are displayed as `React`.

---

## Required and Preferred Skills

CareerForge attempts to identify the structure of a job description by recognizing common qualification headings.

Example:

```text
Required Qualifications:
React
TypeScript
Git

Preferred Qualifications:
AWS
Docker
```

The analyzer produces:

```text
Required Skills:
React, TypeScript, Git

Preferred Skills:
AWS, Docker
```

If a skill appears under both headings, the required classification takes priority so the skill is not counted twice.

Example:

```text
Required Skills:
AWS

Preferred Skills:
AWS
Docker
```

CareerForge classifies:

```text
Required:
AWS

Preferred:
Docker
```

---

## Weighted Match Score

When both required and preferred skills are detected, CareerForge calculates the overall score using:

```text
Required skills: 80%
Preferred skills: 20%
```

Example:

```text
Required score: 100%
Preferred score: 50%
```

Calculation:

```text
100 × 0.80 = 80
50 × 0.20 = 10

Overall score = 90%
```

If only required skills are detected, the required score becomes the overall score.

If only preferred skills are detected, the preferred score becomes the overall score.

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

- Demonstrating missing required skills through projects or professional experience
- Highlighting applicable preferred qualifications
- Moving important matched skills higher on the resume
- Adding measurable accomplishments
- Strengthening examples for partially matched positions
- Tailoring the professional summary to a strong-match position
- Providing a more detailed job description when no recognized skills are found

---

## Input Validation and Reset Flow

CareerForge validates the user’s input before starting an analysis.

The application displays specific messages when:

- Both documents are missing
- The resume is missing
- The job description is missing

Editing either document after an analysis clears the existing results so an outdated score is not displayed.

The **Start New Analysis** button clears:

- Resume text
- Job-description text
- Analysis results
- Validation messages
- Open input editors
- Loading state

---

## Automated Testing

CareerForge uses Vitest to test the resume analysis engine.

The current test suite verifies that the analyzer:

- Recognizes aliases and multi-word skills
- Does not incorrectly match `Java` inside `JavaScript`
- Matches skills regardless of capitalization
- Returns a score of zero when no recognized skills are found
- Generates the correct recommendation for strong matches
- Separates required and preferred skills
- Gives required skills priority when a skill appears in both categories
- Calculates weighted required and preferred scores

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
Tests: 7 passed
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
- Improve job-section classification
- Detect experience-level requirements
- Detect years-of-experience requirements
- Detect education and certification requirements
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
- Add component and user-interface tests
- Deploy the application publicly

---

## Current Limitations

CareerForge is still under active development.

The current analyzer:

- Uses a predefined list of recognized skills
- Relies on keyword and alias matching
- Depends on recognizable headings to separate required and preferred sections
- Treats skills outside a recognized section as required
- Does not fully understand the context in which a skill is mentioned
- Does not yet evaluate years of experience
- Does not detect education or certification requirements
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
- Dividing text into logical sections
- Weighted scoring systems
- Preventing duplicate data
- Separation of concerns
- Reusable utility functions
- Conditional rendering
- Dynamic recommendation logic
- Input validation
- Resetting application state
- Responsive design
- CSS Grid and Flexbox
- Accessible interface design
- Unit testing with Vitest
- Regression testing
- Production build validation
- Git workflow
- Debugging runtime errors

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
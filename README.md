# CareerForge

CareerForge is a resume analysis application designed to help job seekers strengthen their applications by comparing a resume against a job description, identifying skill gaps, evaluating stated experience requirements, calculating a weighted match score, and generating targeted improvement suggestions.

This project is being built as part of my software engineering portfolio while I transition into software engineering. The goal is to develop a modern full-stack application while applying software engineering best practices throughout the development process.

---

## 🚧 Current Status

**Current Milestone:** Experience Requirement Analysis and Weighted Scoring ✅

CareerForge can currently:

- Compare resume text against a job description
- Detect recognized technical skills
- Separate required and preferred qualifications
- Recognize multiple names for the same technology
- Detect explicit years-of-experience requirements
- Compare requested experience against years stated in the resume
- Calculate required and preferred qualification scores
- Calculate a weighted overall match score
- Identify matching and missing skills
- Generate dynamic improvement suggestions
- Display results in a responsive analysis dashboard
- Validate missing user input
- Reset the application for a new analysis
- Validate the analysis engine with automated unit tests

CareerForge is actively under development, with new features being added incrementally.

---

## Features

### Resume and Job Description Input

- Paste resume text directly into the application
- Paste a target job description
- Display character counts for both inputs
- Edit either document after it has been added
- Clear outdated results when either document changes
- Display validation messages when an input is missing
- Start a completely new analysis with one button

### Skill Analysis

- Detect technical skills from a predefined skill database
- Identify skills requested by the job description
- Identify skills found in the resume
- Display required skills matched
- Display required skills missing
- Display preferred skills matched
- Display preferred skills missing
- Prevent duplicate skills from appearing in multiple categories

### Skill Alias Recognition

CareerForge recognizes multiple names for the same technology.

Examples include:

- `React`, `React.js`, and `ReactJS`
- `Node.js` and `NodeJS`
- `AWS` and `Amazon Web Services`
- `PostgreSQL` and `Postgres`
- `C#` and `C Sharp`
- `REST API`, `REST APIs`, and `RESTful APIs`
- `CI/CD`, `CI-CD`, and `CICD`

Each group is displayed using one consistent skill name.

### Required and Preferred Qualifications

CareerForge recognizes common job-description headings such as:

- `Required Qualifications`
- `Required Skills`
- `Requirements`
- `Minimum Qualifications`
- `Basic Qualifications`
- `Must Have`
- `Preferred Qualifications`
- `Preferred Skills`
- `Nice to Have`
- `Bonus Skills`
- `Desired Qualifications`

Skills found under required headings are classified as required.

Skills found under preferred headings are classified as preferred.

If a skill appears in both sections, the required classification takes priority.

### Experience Requirement Detection

CareerForge detects explicitly stated years-of-experience requirements such as:

- `3 years of React experience`
- `3+ years of React experience`
- `At least two years working with AWS`
- `Five years of software development experience`
- `2–4 years of Python experience`

The analyzer supports both numeric and written values.

Examples:

```text
2 years
2+ years
two years
five years
3–5 years
```

For a range such as `3–5 years`, CareerForge currently uses the minimum required value of `3`.

CareerForge then checks whether the resume explicitly states enough experience.

Example:

```text
Job requirement:
3+ years of React experience

Resume:
4 years of React experience
```

Result:

```text
Meets stated requirement
```

A resume that mentions React without stating a number of years still receives credit for the React skill, but the experience requirement remains unconfirmed.

### Dynamic Suggestions

CareerForge generates suggestions from the actual analysis instead of displaying the same recommendations for every result.

Suggestions may include:

- Demonstrating missing required skills through projects or experience
- Highlighting preferred qualifications when applicable
- Making years of experience more explicit
- Moving important matched skills higher on the resume
- Adding measurable accomplishments
- Strengthening examples for partially matched positions
- Tailoring the professional summary for a strong-match position
- Providing a more detailed job description when no recognized qualifications are found

### User Interface

- Responsive dark-themed interface
- Custom teal-and-gold technology-inspired design
- Reusable React components
- Loading state during analysis
- Match-score progress bar
- Separate required and preferred score breakdowns
- Dedicated experience-requirements dashboard
- Clear matched, missing, confirmed, and unconfirmed states
- Accessible labels and status messages
- Mobile-responsive result cards

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
4. The analyzer searches those sections for recognized skills and aliases.
5. Skills found in general or required sections are classified as required.
6. Skills found in preferred sections are classified as preferred.
7. If a skill appears in both categories, it is treated as required.
8. CareerForge checks the resume for each identified skill.
9. The analyzer detects explicit years-of-experience requirements.
10. The resume is checked for explicitly stated years associated with those requirements.
11. CareerForge calculates:
    - Required skills matched
    - Required skills missing
    - Preferred skills matched
    - Preferred skills missing
    - Experience requirements met
    - Experience requirements not confirmed
    - Required qualification score
    - Preferred qualification score
    - Weighted overall match score
12. Dynamic recommendations are generated from the results.
13. The results are displayed in an interactive dashboard.

---

## Qualification Scoring

CareerForge treats skills and explicit experience requirements as separate qualification criteria.

Example required qualifications:

```text
React
AWS
3+ years of React experience
2+ years of AWS experience
```

If the resume:

- Mentions React
- Mentions AWS
- States 4 years of React experience
- States only 1 year of AWS experience

Then the user meets three of four required criteria:

```text
Required qualification score: 75%
```

### Weighted Overall Score

When both required and preferred qualifications are detected, CareerForge calculates:

```text
Required qualifications: 80% of the overall score
Preferred qualifications: 20% of the overall score
```

Example:

```text
Required score: 75%
Preferred score: 50%
```

Calculation:

```text
75 × 0.80 = 60
50 × 0.20 = 10

Overall score = 70%
```

If only required qualifications are detected, the required score becomes the overall score.

If only preferred qualifications are detected, the preferred score becomes the overall score.

---

## Skill Matching Behavior

CareerForge uses regular expressions and boundary-aware matching to prevent incorrect matches.

Examples:

- `Java` is not counted simply because `JavaScript` appears.
- `ReactJS` is displayed as `React`.
- `Amazon Web Services` is displayed as `AWS`.
- `NodeJS` is displayed as `Node.js`.
- `.NET`, `C#`, and `CI/CD` are safely matched despite punctuation.

The application only compares the resume against skills requested by the job description. Additional resume skills that are not requested are not included in the match score.

---

## Input Validation and Reset Flow

CareerForge displays specific validation messages when:

- Both documents are missing
- The resume is missing
- The job description is missing

Editing either document after an analysis clears the previous results so an outdated score is not displayed.

The **Start New Analysis** button clears:

- Resume text
- Job-description text
- Analysis results
- Validation messages
- Error messages
- Open input editors
- Loading state

---

## Automated Testing

CareerForge uses Vitest to test the resume-analysis engine.

The current test suite verifies that the analyzer:

- Recognizes aliases and multi-word skills
- Does not incorrectly match `Java` inside `JavaScript`
- Matches skills regardless of capitalization
- Returns a score of zero when no recognized skills are found
- Generates the correct recommendation for strong matches
- Separates required and preferred skills
- Gives required skills priority when a skill appears in both categories
- Detects skill-specific experience requirements
- Detects written general-experience requirements
- Compares requested experience against explicitly stated resume experience

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
Tests: 9 passed
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

## Current Limitations

CareerForge is still under active development.

The current analyzer:

- Uses a predefined list of recognized skills
- Relies on keyword, alias, and pattern matching
- Depends on recognizable headings to separate required and preferred sections
- Treats skills outside a recognized section as required
- Does not fully understand the context in which a skill is mentioned
- Only evaluates years of experience when they are explicitly stated
- Does not calculate experience from employment dates
- Does not verify whether a mentioned skill was used professionally
- Does not detect education or certification requirements
- Does not currently process PDF or Word documents
- Does not save previous analyses
- Does not yet use an external AI service or backend

A skill appearing in a resume does not necessarily prove professional experience with that skill. The current version determines whether a recognized skill or alias appears in the supplied text.

Similarly, an experience requirement is only considered confirmed when the resume explicitly states a sufficient number of years.

---

## Planned Features

- Expand the recognized skill library
- Move skill definitions into a dedicated data module
- Improve text normalization
- Improve job-section classification
- Improve relationships between skills and experience statements
- Detect education requirements
- Detect certification requirements
- Detect degree preferences
- Add PDF resume uploads
- Add Word document uploads
- Add AI-powered contextual analysis
- Add ATS optimization recommendations
- Replace the predefined skill list with dynamic skill extraction
- Create a backend API using FastAPI
- Add user accounts and saved analyses
- Add resume version tracking
- Create a job-application dashboard
- Generate tailored cover letters
- Add component and user-interface tests
- Expand automated test coverage
- Deploy the application publicly

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
  - `reduce()`
- Regular expressions
- Escaping special regular-expression characters
- Skill alias matching
- Multi-word text matching
- Text segmentation
- Job-description section classification
- Detecting numeric and written experience requirements
- Comparing structured qualification data
- Weighted scoring systems
- Preventing duplicate data
- Separation of concerns
- Reusable utility functions
- Conditional rendering
- Dynamic recommendation logic
- Input validation
- Resetting application state
- Runtime error handling
- Responsive design
- CSS Grid and Flexbox
- Accessible interface design
- Unit testing with Vitest
- Regression testing
- Production build validation
- Git workflow
- Debugging TypeScript and React runtime errors

---

## AI-Assisted Development

AI tools were used during development as a learning, debugging, and design assistant. I reviewed, tested, and integrated each implementation while building my understanding of the underlying React, TypeScript, testing, scoring, and application-design concepts.

All current functionality has been validated through manual testing, automated unit tests, linting, and production builds.

---

## Future Goals

CareerForge is intended to become a complete AI-powered career assistant capable of helping users:

- Optimize resumes
- Generate tailored cover letters
- Track job applications
- Prepare for interviews
- Improve ATS compatibility
- Save and compare resume versions
- Receive job-specific recommendations
- Better understand qualification gaps

---

## Author

**Reynaldo Serrano**

Army Veteran | Software Engineering Student | Aspiring Full-Stack Software Engineer

Building CareerForge one feature at a time while documenting the learning journey.
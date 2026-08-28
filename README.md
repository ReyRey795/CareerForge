# CareerForge

CareerForge is a resume analysis application designed to help job seekers strengthen their applications by comparing a resume against a job description, identifying skill gaps, evaluating stated experience requirements, detecting recognized education requirements, calculating a weighted match score, and generating targeted improvement suggestions.

This project is being built as part of my software engineering portfolio while I transition into software engineering. The goal is to develop a modern full-stack application while applying software engineering best practices throughout the development process.

---

## 🚧 Current Status

**Current Milestone: Education Requirement Detection Foundation ✅**

CareerForge can currently:

- Compare resume text against a job description
- Detect recognized technical skills
- Separate required and preferred qualifications
- Recognize multiple names for the same technology
- Detect explicit years-of-experience requirements
- Compare requested experience against years explicitly stated in the resume
- Calculate required and preferred qualification scores
- Calculate a weighted overall match score
- Identify matching and missing skills
- Generate dynamic improvement suggestions
- Detect recognized education requirements in job descriptions
- Classify detected education requirements as required or preferred
- Pass education and certification result structures through application state
- Validate missing user input
- Reset the application for a new analysis
- Handle wrapped experience statements in resume text
- Store the recognized skill catalog in a dedicated data module
- Store education and certification definitions in a dedicated qualification module
- Recognize 31 frontend, backend, cloud, testing, database, API, operating-system, and development-methodology skills
- Validate the analysis engine with automated unit tests
- Validate feature milestones with ESLint, Vitest, TypeScript compilation, and Vite production builds
- Publish the frontend through GitHub Pages using GitHub Actions

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

- Detect technical skills from a predefined skill catalog
- Identify skills requested by the job description
- Identify skills found in the resume
- Separate required and preferred skills
- Identify required skills matched
- Identify required skills missing
- Identify preferred skills matched
- Identify preferred skills missing
- Prevent duplicate skills from appearing in multiple categories

### Modular Skill Catalog

Recognized skills and aliases are stored in:

```text
src/data/skills.ts
```

Keeping the skill catalog separate from the analysis engine makes it easier to:

- Add new technologies
- Add aliases
- Review supported skills
- Reuse skill definitions
- Test matching behavior
- Keep the analyzer focused on comparison and scoring logic

Each skill uses a consistent structure:

```ts
type SkillDefinition = {
  name: string
  aliases: string[]
}
```

Example:

```ts
{
  name: 'AWS',
  aliases: ['AWS', 'Amazon Web Services'],
}
```

### Skill Alias Recognition

CareerForge recognizes multiple names for the same technology.

Examples include:

- `React`, `React.js`, and `ReactJS`
- `JavaScript` and `ECMAScript`
- `HTML` and `HTML5`
- `CSS`, `CSS3`, and `Cascading Style Sheets`
- `Tailwind CSS`, `TailwindCSS`, and `Tailwind`
- `Next.js`, `NextJS`, and `Next JS`
- `Node.js` and `NodeJS`
- `Express`, `Express.js`, and `ExpressJS`
- `C#` and `C Sharp`
- `.NET` and `dotnet`
- `AWS` and `Amazon Web Services`
- `Azure` and `Microsoft Azure`
- `Kubernetes` and `K8s`
- `MongoDB` and `Mongo DB`
- `PostgreSQL` and `Postgres`
- `REST API`, `REST APIs`, `RESTful API`, and `RESTful APIs`
- `CI/CD`, `CI-CD`, and `CICD`

Each group is displayed using one consistent skill name.

### Required and Preferred Qualifications

CareerForge recognizes common job-description headings such as:

- `Required Qualifications`
- `Required Skills`
- `Requirements`
- `Core Requirements`
- `Minimum Qualifications`
- `Basic Qualifications`
- `Qualifications`
- `Must Have`
- `What We're Looking For`
- `Preferred Qualifications`
- `Preferred Skills`
- `Nice to Have`
- `Bonus Skills`
- `Desired Qualifications`
- `Additional Qualifications`

Skills found under required headings are classified as required.

Skills found under preferred headings are classified as preferred.

If a skill appears in both sections, the required classification takes priority.

---

## Experience Requirement Detection

CareerForge detects explicitly stated years-of-experience requirements such as:

- `3 years of React experience`
- `3+ years of React experience`
- `At least two years working with AWS`
- `Five years of software development experience`
- `2–4 years of Python experience`

The analyzer supports numeric and written values.

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

A resume that mentions React without stating a number of years still receives credit for the React skill, but the separate experience requirement remains unconfirmed.

### Wrapped Resume Statements

Resume text frequently wraps across lines when copied from another document.

CareerForge joins lines within the same paragraph before experience evaluation. This allows text such as:

```text
4 years of
React experience
```

to be interpreted as:

```text
4 years of React experience
```

CareerForge does not currently infer years of experience from employment dates.

---

## Education Requirement Detection

CareerForge now has the foundation for recognizing education requirements in job descriptions.

Education definitions are stored in:

```text
src/data/qualifications.ts
```

The current catalog includes:

- High school diploma or GED
- Associate's degree
- Bachelor's degree
- Master's degree
- Doctoral degree

Each education definition uses a structured format:

```ts
type EducationDefinition = {
  label: string
  level: EducationLevel
  rank: number
  aliases: string[]
}
```

For example, a job description containing:

```text
Required Qualifications:
Bachelor's degree in Computer Science,
Information Technology, Software Engineering,
or a related field
```

can be identified as:

```text
Education requirement: Bachelor's degree
Category: Required
Level: Bachelor
```

Education detection is being implemented in separate stages.

CareerForge can currently detect that a recognized education requirement exists in the job description, but it does **not yet evaluate the resume to determine whether that education requirement is satisfied**.

Education requirements also do **not currently affect the match score**.

---

## Qualification Catalog

Education and certification data are stored in:

```text
src/data/qualifications.ts
```

Separating qualification definitions from the analysis engine keeps the analyzer easier to maintain and allows supported qualifications to expand without embedding large data lists directly inside the comparison logic.

The certification catalog currently contains definitions for:

- AWS certifications
- CompTIA Security+
- Project Management Professional (PMP)

Certification definitions contain separate aliases for job-description detection and resume evaluation.

The certification data structure is in place, but **certification detection and resume evaluation have not been implemented yet**.

---

## Dynamic Suggestions

CareerForge generates suggestions from the actual analysis instead of displaying the same recommendations for every result.

Suggestions may include:

- Demonstrating missing required skills through projects or experience
- Highlighting preferred qualifications when applicable
- Making years of experience more explicit
- Moving important matched skills higher on the resume
- Adding measurable accomplishments
- Strengthening examples for partially matched positions
- Tailoring the professional summary for a strong-match position
- Providing a more detailed job description when no recognized scored qualifications are found

Education and certification recommendations will be added as those qualification systems are completed.

---

## User Interface

The current interface includes:

- Responsive dark-themed interface
- Custom teal-and-gold technology-inspired design
- Reusable React components
- Resume and job-description editors
- Character counts
- Loading state during analysis
- Match-score progress bar
- Separate required and preferred score breakdowns
- Required skill results
- Preferred skill results
- Dynamic recommendations
- Clear matched and missing states
- Accessible labels and status messages
- Mobile-responsive result cards
- Start New Analysis workflow

The analysis engine also produces experience, education, and certification result structures.

Dedicated interface sections for those qualification types are being added incrementally.

---

## Recognized Skills

The current skill catalog recognizes 31 skills.

### Frontend

- React
- TypeScript
- JavaScript
- HTML
- CSS
- Tailwind CSS
- Next.js

### Backend and Programming

- Node.js
- Express
- Python
- Java
- C#
- .NET
- FastAPI
- GraphQL

### Development and Testing

- Git
- GitHub
- Jest
- Vitest

### Cloud, DevOps, and Operating Systems

- AWS
- Azure
- Docker
- Kubernetes
- Linux
- CI/CD

### Databases and APIs

- MongoDB
- PostgreSQL
- SQL
- REST APIs

### Development Methodologies

- Agile
- Scrum

The skill catalog will continue to expand as the analysis engine develops.

---

## How It Works

1. The user enters resume text.
2. The user pastes a job description.
3. CareerForge divides the job description into general, required, and preferred sections.
4. The analyzer loads recognized skills and aliases from `src/data/skills.ts`.
5. The analyzer searches the job-description sections for recognized skills and aliases.
6. Skills found in general or required sections are classified as required.
7. Skills found in preferred sections are classified as preferred.
8. If a skill appears in both categories, it is treated as required.
9. CareerForge checks the resume for each identified skill.
10. The analyzer detects explicit years-of-experience requirements.
11. Wrapped resume lines inside the same paragraph are joined before experience evaluation.
12. The resume is checked for explicitly stated years associated with those requirements.
13. Education definitions are loaded from `src/data/qualifications.ts`.
14. CareerForge searches classified job-description sections for recognized education requirements.
15. Detected education requirements are classified as required or preferred.
16. CareerForge calculates:
    - Required skills matched
    - Required skills missing
    - Preferred skills matched
    - Preferred skills missing
    - Experience requirements met
    - Experience requirements not confirmed
    - Required qualification score
    - Preferred qualification score
    - Weighted overall match score
17. Dynamic recommendations are generated from the scored results.
18. Analysis results are passed through application state.
19. The current interface renders the supported result sections.

Education requirements are currently detected separately and do not yet affect scoring.

Certification analysis will be added as a separate development milestone.

---

## Qualification Scoring

CareerForge currently treats skills and explicit experience requirements as separate qualification criteria.

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

then the user meets three of four required criteria:

```text
Required qualification score: 75%
```

### Skill Presence and Experience Are Separate Criteria

CareerForge distinguishes between:

```text
AWS appears in the resume
```

and:

```text
The resume confirms the requested number of years with AWS
```

This prevents a technology mention from automatically being treated as proof that the candidate has a specific number of years using it.

### Weighted Overall Score

When both required and preferred scored qualifications are detected, CareerForge calculates:

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

If only required scored qualifications are detected, the required score becomes the overall score.

If only preferred scored qualifications are detected, the preferred score becomes the overall score.

### Current Scoring Scope

The match score currently includes:

- Required skills
- Preferred skills
- Required experience requirements
- Preferred experience requirements

The match score does **not yet include**:

- Education requirements
- Certification requirements

Those qualification types are being implemented and tested separately before being incorporated into scoring.

---

## Skill Matching Behavior

CareerForge uses regular expressions and boundary-aware matching to reduce incorrect matches.

Examples:

- `Java` is not counted simply because `JavaScript` appears.
- `ReactJS` is displayed as `React`.
- `Amazon Web Services` is displayed as `AWS`.
- `NodeJS` is displayed as `Node.js`.
- `.NET`, `C#`, and `CI/CD` are safely matched despite punctuation.
- New skill names are tested to ensure they do not match inside unrelated words.

The application only compares the resume against recognized skills requested by the job description.

Additional resume skills that are not requested are not included in the match score.

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
- Includes experience requirements in weighted scoring
- Matches a skill without falsely confirming unstated years of experience
- Recognizes expanded full-stack skill aliases
- Recognizes cloud, DevOps, testing, and operating-system aliases
- Prevents expanded skill names from matching inside unrelated words
- Detects a required bachelor's-degree requirement

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
Tests: 15 passed
```

---

## Quality Checks

Before feature milestones are committed, the frontend is checked with:

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
- JavaScript
- Vite
- CSS

### Testing and Validation

- Vitest
- ESLint
- TypeScript
- Vite production builds

### Planned Backend

- FastAPI
- Python
- OpenAI API

### Development Tools

- Git
- GitHub
- GitHub Actions
- GitHub Pages
- npm
- VS Code

---

## Project Structure

```text
CareerForge/
├── .github/
│   └── workflows/
├── README.md
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ActionButton.tsx
    │   │   ├── AnalysisResult.tsx
    │   │   ├── Header.tsx
    │   │   ├── JobDescription.tsx
    │   │   └── ResumeUpload.tsx
    │   ├── data/
    │   │   ├── qualifications.ts
    │   │   └── skills.ts
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

## Deployment

CareerForge includes GitHub Pages publishing support through GitHub Actions.

The deployment workflow is stored under:

```text
.github/workflows/
```

The workflow builds and publishes the frontend through the repository's GitHub Pages configuration.

Deployment configuration is kept separate from the application source so the frontend development structure remains focused on the application itself.

---

## Current Limitations

CareerForge is still under active development.

The current analyzer:

- Uses predefined catalogs of recognized skills and qualifications
- Relies on keyword, alias, and pattern matching
- Depends on recognizable headings to separate required and preferred sections
- Treats recognized qualifications outside a preferred section as required
- Does not fully understand the context in which every skill is mentioned
- Only evaluates years of experience when they are explicitly stated
- Does not calculate experience from employment dates
- Does not verify whether a mentioned skill was used professionally
- Detects recognized education requirements but does not yet evaluate the resume against them
- Does not yet detect or evaluate certification requirements
- Does not include education or certification requirements in match scoring
- Does not yet display dedicated education or certification result sections
- Does not currently process PDF or Word resume uploads
- Does not save previous analyses
- Does not yet use an external AI service or backend

A skill appearing in a resume does not necessarily prove professional experience with that skill. The current version determines whether a recognized skill or alias appears in the supplied text.

Similarly, an experience requirement is only considered confirmed when the resume explicitly states a sufficient number of years.

Education detection currently determines whether a recognized education requirement appears in the job description. Resume-side education evaluation will be implemented separately.

---

## Planned Features

- Evaluate detected education requirements against resume education
- Recognize completed and in-progress education
- Allow completed higher-level degrees to satisfy lower-level degree requirements
- Detect certification requirements
- Compare certification requirements against resume certifications
- Display education requirements in the analysis dashboard
- Display certification requirements in the analysis dashboard
- Determine how education and certification criteria should contribute to scoring
- Continue expanding the recognized skill catalog
- Add additional mobile, data, cloud, testing, and DevOps technologies
- Improve text normalization
- Improve job-section classification
- Improve relationships between skills and experience statements
- Improve qualification alias recognition
- Detect equivalent education-or-experience language
- Add PDF resume uploads
- Add Word document uploads
- Add AI-powered contextual analysis
- Add ATS optimization recommendations
- Replace predefined skill matching with more dynamic skill extraction where appropriate
- Create a backend API using FastAPI
- Add user accounts and saved analyses
- Add resume version tracking
- Create a job-application dashboard
- Generate tailored cover letters
- Add component and user-interface tests
- Expand automated test coverage

---

## Incremental Development Approach

CareerForge is intentionally being built in small, testable milestones.

The current development workflow is:

1. Identify one behavior to add.
2. Add the smallest data structure or code change needed to support it.
3. Add a focused automated test when appropriate.
4. Confirm the test fails for the expected reason.
5. Implement only the logic needed for that behavior.
6. Run linting.
7. Run the complete automated test suite.
8. Run a production build.
9. Manually test interface changes when needed.
10. Commit the completed milestone with Git.
11. Update documentation when a meaningful checkpoint is reached.

This approach keeps individual changes understandable, makes regressions easier to isolate, and creates a Git history that shows how the application evolved feature by feature.

---

## What I've Learned

This project has strengthened my understanding of:

- React components
- Component communication through props
- State management with React hooks
- TypeScript types and custom data structures
- Type-only imports
- Separating data from application logic
- Modular data catalogs
- Passing structured analyzer results through application state
- Array methods
  - `filter()`
  - `includes()`
  - `map()`
  - `some()`
  - `reduce()`
- Regular expressions
- Escaping special regular-expression characters
- Boundary-aware matching
- Skill alias matching
- Expanding a typed modular skill catalog
- Testing aliases across frontend, backend, cloud, database, testing, and DevOps technologies
- Multi-word text matching
- Text segmentation
- Job-description section classification
- Detecting numeric and written experience requirements
- Comparing structured qualification data
- Modeling education levels with TypeScript
- Separating requirement detection from requirement evaluation
- Building reusable education and certification catalogs
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
- Test-driven feature development
- Regression testing
- ESLint validation
- TypeScript compilation
- Production build validation
- Git workflow
- GitHub Actions
- GitHub Pages deployment
- Debugging TypeScript and React errors
- Incremental feature development

---

## AI-Assisted Development

AI tools were used during development as a learning, debugging, and design assistant. I reviewed, tested, and integrated each implementation while building my understanding of the underlying React, TypeScript, testing, scoring, and application-design concepts.

Development changes are added incrementally so I can review what each piece does, test its behavior, and understand how it connects to the rest of the application.

All current functionality has been validated through manual testing where applicable, automated unit tests, linting, TypeScript compilation, and production builds.

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
- Evaluate education and certification alignment
- Better understand qualification gaps

The long-term goal is to combine deterministic analysis, structured qualification data, and contextual AI assistance while keeping the application's results understandable and transparent.

---

## Author

**Reynaldo Serrano**

Army Veteran | Software Engineering Student | Aspiring Full-Stack Software Engineer

Building CareerForge one feature at a time while documenting the learning journey.
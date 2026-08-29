# CareerForge

CareerForge is a resume analysis application designed to help job seekers compare a resume against a job description, identify qualification gaps, evaluate stated experience, education, and certification requirements, calculate a weighted match score, and generate targeted improvement suggestions.

This project is being built as part of my software engineering portfolio while I transition into software engineering. The goal is to develop a modern full-stack application while applying software engineering best practices throughout the development process.

---

## 🚧 Current Status

**Current Milestone: Qualification Detection and Results Dashboard ✅**

CareerForge can currently:

- Compare resume text against a job description
- Detect recognized technical skills
- Separate required and preferred qualifications
- Recognize aliases for the same technology
- Detect explicit years-of-experience requirements
- Compare requested experience against years explicitly stated in the resume
- Detect education requirements
- Evaluate completed and in-progress education
- Allow higher completed degrees to satisfy lower degree requirements
- Detect supported certification requirements
- Check whether supported certifications appear in the resume
- Classify education and certification requirements as required or preferred
- Calculate required and preferred qualification scores
- Calculate a weighted overall match score
- Include skills and explicit experience requirements in scoring
- Display experience, education, and certification requirements in the results dashboard
- Identify matching and missing skills
- Generate dynamic improvement suggestions
- Validate missing user input
- Reset the application for a new analysis
- Handle wrapped experience statements in resume text
- Validate the analysis engine with automated unit tests

CareerForge is actively under development. Education and certification requirements are currently reported separately and do not yet contribute to the match score.

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

CareerForge compares recognized skills requested by the job description against the supplied resume.

The analyzer can:

- Detect required skills
- Detect preferred skills
- Identify matched required skills
- Identify missing required skills
- Identify matched preferred skills
- Identify missing preferred skills
- Prevent required skills from also appearing as preferred duplicates
- Recognize aliases for the same technology
- Prevent partial-word false positives

For example, `Java` is not counted simply because `JavaScript` appears.

---

## Modular Skill Catalog

Recognized skills and aliases are stored in:

```text
src/data/skills.ts
import { describe, expect, it } from 'vitest'
import { analyzeResume } from './analyzeResume'

describe('analyzeResume', () => {
  it('recognizes aliases and multi-word skills', () => {
    const resume = `
      Frontend developer experienced with ReactJS,
      Amazon Web Services, Postgres, RESTful APIs,
      and CI-CD pipelines.
    `

    const jobDescription = `
      Required Qualifications:
      React.js
      AWS
      PostgreSQL
      REST APIs
      CI/CD
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([
      'React',
      'AWS',
      'PostgreSQL',
      'REST APIs',
      'CI/CD',
    ])

    expect(result.missingRequiredSkills).toEqual([])
    expect(result.percentMatched).toBe(100)
  })

  it('does not match Java inside JavaScript', () => {
    const resume = `
      JavaScript developer with frontend
      application experience.
    `

    const jobDescription = `
      Required Qualifications:
      Java
      JavaScript
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([
      'JavaScript',
    ])

    expect(result.missingRequiredSkills).toEqual([
      'Java',
    ])

    expect(result.percentMatched).toBe(50)
  })

  it('matches skills regardless of capitalization', () => {
    const resume = `
      Experienced with react, typescript,
      docker, and aws.
    `

    const jobDescription = `
      Required Qualifications:
      REACT
      TYPESCRIPT
      DOCKER
      AWS
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([
      'React',
      'TypeScript',
      'AWS',
      'Docker',
    ])

    expect(result.missingRequiredSkills).toEqual([])
    expect(result.percentMatched).toBe(100)
  })

  it('returns a zero score when no recognized skills are found', () => {
    const resume = `
      Experienced professional with leadership
      and project coordination experience.
    `

    const jobDescription = `
      Seeking a candidate with strong communication,
      organization, and customer service abilities.
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.requiredSkills).toEqual([])
    expect(result.preferredSkills).toEqual([])
    expect(result.experienceRequirements).toEqual([])
    expect(result.requiredScore).toBe(0)
    expect(result.preferredScore).toBe(0)
    expect(result.percentMatched).toBe(0)
  })

  it('generates a strong-match suggestion for a high score', () => {
    const resume = `
      Software developer experienced with
      React and TypeScript.
    `

    const jobDescription = `
      Required Qualifications:
      React
      TypeScript
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.percentMatched).toBe(100)

    expect(
      result.suggestions.some((suggestion) =>
        suggestion.includes(
          'qualifications align well'
        )
      )
    ).toBe(true)
  })

  it('separates required and preferred skills', () => {
    const resume = `
      Developer experienced with React
      and Docker.
    `

    const jobDescription = `
      Required Qualifications:
      React
      AWS

      Preferred Qualifications:
      Docker
      TypeScript
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.requiredSkills).toEqual([
      'React',
      'AWS',
    ])

    expect(result.preferredSkills).toEqual([
      'TypeScript',
      'Docker',
    ])

    expect(result.matchedRequiredSkills).toEqual([
      'React',
    ])

    expect(result.missingRequiredSkills).toEqual([
      'AWS',
    ])

    expect(result.matchedPreferredSkills).toEqual([
      'Docker',
    ])

    expect(result.missingPreferredSkills).toEqual([
      'TypeScript',
    ])

    expect(result.requiredScore).toBe(50)
    expect(result.preferredScore).toBe(50)
    expect(result.percentMatched).toBe(50)
  })

  it('gives required skills priority over preferred duplicates', () => {
    const resume = `
      Developer experienced with React.
    `

    const jobDescription = `
      Required Qualifications:
      React
      AWS

      Preferred Qualifications:
      React
      Docker
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.requiredSkills).toEqual([
      'React',
      'AWS',
    ])

    expect(result.preferredSkills).toEqual([
      'Docker',
    ])

    expect(result.matchedRequiredSkills).toEqual([
      'React',
    ])

    expect(
      result.matchedPreferredSkills
    ).not.toContain('React')
  })

  it('detects and evaluates skill experience requirements', () => {
    const resume = `
      Software developer with 4 years of
      React experience and 1 year working
      with AWS.
    `

    const jobDescription = `
      Required Qualifications:
      3+ years of React experience
      At least two years working with AWS
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.experienceRequirements).toEqual([
      expect.objectContaining({
        label: 'AWS',
        years: 2,
        category: 'required',
        resumeYears: 1,
        meetsRequirement: false,
      }),
      expect.objectContaining({
        label: 'React',
        years: 3,
        category: 'required',
        resumeYears: 4,
        meetsRequirement: true,
      }),
    ])
  })

  it('detects written general experience and preferred experience', () => {
    const resume = `
      Software developer with six years of
      software development experience.

      Familiar with Docker.
    `

    const jobDescription = `
      Required Qualifications:
      Five years of software development experience

      Preferred Qualifications:
      2+ years of Docker experience
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.experienceRequirements).toEqual([
      expect.objectContaining({
        label: 'Software development',
        years: 5,
        category: 'required',
        resumeYears: 6,
        meetsRequirement: true,
      }),
      expect.objectContaining({
        label: 'Docker',
        years: 2,
        category: 'preferred',
        resumeYears: null,
        meetsRequirement: false,
      }),
    ])
  })

  it('includes experience requirements in the weighted match score', () => {
    const resume = `
      Software developer with 4 years of
      React experience.

      I have 1 year of experience working
      with AWS.

      I have built and deployed applications
      using Docker.
    `

    const jobDescription = `
      Required Qualifications:
      3+ years of React experience
      At least two years working with AWS

      Preferred Qualifications:
      2+ years of Docker experience
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.requiredScore).toBe(75)
    expect(result.preferredScore).toBe(50)
    expect(result.percentMatched).toBe(70)

    expect(result.matchedRequiredSkills).toEqual([
      'React',
      'AWS',
    ])

    expect(result.matchedPreferredSkills).toEqual([
      'Docker',
    ])

    expect(result.experienceRequirements).toEqual([
      expect.objectContaining({
        label: 'AWS',
        years: 2,
        resumeYears: 1,
        category: 'required',
        meetsRequirement: false,
      }),
      expect.objectContaining({
        label: 'React',
        years: 3,
        resumeYears: 4,
        category: 'required',
        meetsRequirement: true,
      }),
      expect.objectContaining({
        label: 'Docker',
        years: 2,
        resumeYears: null,
        category: 'preferred',
        meetsRequirement: false,
      }),
    ])
  })

  it('matches a skill without confirming unstated years of experience', () => {
    const resume = `
      Python developer who has built several
      automation projects.
    `

    const jobDescription = `
      Required Qualifications:
      3+ years of Python experience
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([
      'Python',
    ])

    expect(result.requiredScore).toBe(50)
    expect(result.percentMatched).toBe(50)

    expect(result.experienceRequirements).toEqual([
      expect.objectContaining({
        label: 'Python',
        years: 3,
        resumeYears: null,
        category: 'required',
        meetsRequirement: false,
      }),
    ])
  })

  it('recognizes expanded full-stack skill aliases', () => {
    const resume = `
      Frontend and backend developer experienced with
      HTML5, CSS3, TailwindCSS, NextJS, Express.js,
      and Mongo DB.
    `

    const jobDescription = `
      Required Qualifications:
      HTML
      CSS
      Tailwind CSS
      Next.js
      Express
      MongoDB
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Next.js',
      'Express',
      'MongoDB',
    ])

    expect(result.missingRequiredSkills).toEqual([])
    expect(result.percentMatched).toBe(100)
  })

  it('recognizes cloud, DevOps, testing, and operating-system aliases', () => {
    const resume = `
      Worked with Microsoft Azure, K8s, GraphQL,
      Jest, Vitest, and Linux.
    `

    const jobDescription = `
      Required Qualifications:
      Azure
      Kubernetes
      GraphQL
      Jest
      Vitest
      Linux
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([
      'GraphQL',
      'Jest',
      'Vitest',
      'Azure',
      'Kubernetes',
      'Linux',
    ])

    expect(result.missingRequiredSkills).toEqual([])
    expect(result.percentMatched).toBe(100)
  })

  it('does not match new skills inside unrelated words', () => {
    const resume = `
      Built expression parsers and designed
      majestic user interfaces.
    `

    const jobDescription = `
      Required Qualifications:
      Express
      Jest
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.matchedRequiredSkills).toEqual([])
    expect(result.missingRequiredSkills).toEqual([
      'Express',
      'Jest',
    ])
    expect(result.percentMatched).toBe(0)
  })

  it('detects a required bachelor education requirement', () => {
    const resume = `
      Bachelor of Science in Information Technology
    `

    const jobDescription = `
      Required Qualifications:
      Bachelor's degree in Computer Science,
      Information Technology, Software Engineering,
      or a related field
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.educationRequirements).toEqual([
      expect.objectContaining({
        label: "Bachelor's degree",
        level: 'bachelor',
        category: 'required',
      }),
    ])
  })

  it('recognizes a completed bachelor degree in the resume', () => {
    const resume = `
      Education

      Bachelor of Science in Information Technology
    `

    const jobDescription = `
      Required Qualifications:
      Bachelor's degree in Computer Science,
      Information Technology, Software Engineering,
      or a related field
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.educationRequirements).toEqual([
      expect.objectContaining({
        label: "Bachelor's degree",
        level: 'bachelor',
        category: 'required',
        status: 'completed',
        resumeEducationLabel:
          "Bachelor's degree",
        meetsRequirement: true,
      }),
    ])
  })

  it('does not treat an in-progress bachelor degree as completed', () => {
    const resume = `
      Education

      Bachelor of Science in Software Engineering
      In Progress
    `

    const jobDescription = `
      Required Qualifications:
      Bachelor's degree in Computer Science,
      Software Engineering, or a related field
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.educationRequirements).toEqual([
      expect.objectContaining({
        label: "Bachelor's degree",
        level: 'bachelor',
        category: 'required',
        status: 'in-progress',
        resumeEducationLabel:
          "Bachelor's degree",
        meetsRequirement: false,
      }),
    ])
  })

  it('allows a higher completed degree to satisfy a lower degree requirement', () => {
    const resume = `
      Education

      Master of Science in Information Technology
    `

    const jobDescription = `
      Required Qualifications:
      Bachelor's degree in Computer Science,
      Information Technology, Software Engineering,
      or a related field
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.educationRequirements).toEqual([
      expect.objectContaining({
        label: "Bachelor's degree",
        level: 'bachelor',
        category: 'required',
        status: 'completed',
        resumeEducationLabel:
          "Master's degree",
        meetsRequirement: true,
      }),
    ])
  })

  it('does not allow a lower degree to satisfy a higher degree requirement', () => {
    const resume = `
      Education

      Bachelor of Science in Information Technology
    `

    const jobDescription = `
      Required Qualifications:
      Master's degree in Computer Science,
      Information Technology, or a related field
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(result.educationRequirements).toEqual([
      expect.objectContaining({
        label: "Master's degree",
        level: 'master',
        category: 'required',
        status: 'not-found',
        resumeEducationLabel: null,
        meetsRequirement: false,
      }),
    ])
  })

  it('detects a required Security+ certification found in the resume', () => {
    const resume = `
      Certifications

      CompTIA Security+
    `

    const jobDescription = `
      Required Qualifications:
      CompTIA Security+ certification
    `

    const result = analyzeResume(
      resume,
      jobDescription
    )

    expect(
      result.certificationRequirements
    ).toEqual([
      expect.objectContaining({
        label: 'CompTIA Security+',
        category: 'required',
        foundInResume: true,
      }),
    ])
  })
})

it('detects a required Security+ certification missing from the resume', () => {
  const resume = `
    Technical Skills

    React
    TypeScript
  `

  const jobDescription = `
    Required Qualifications:
    CompTIA Security+ certification
  `

  const result = analyzeResume(
    resume,
    jobDescription
  )

  expect(
    result.certificationRequirements
  ).toEqual([
    expect.objectContaining({
      label: 'CompTIA Security+',
      category: 'required',
      foundInResume: false,
    }),
  ])
})
import { describe, expect, it } from 'vitest'
import { analyzeResume } from './analyzeResume'

describe('analyzeResume', () => {
  it('recognizes aliases and multi-word skills', () => {
    const jobDescription = `
      We are seeking a developer with experience in NodeJS,
      Amazon Web Services, C#, REST APIs, Docker, and CI/CD.
    `

    const resumeText = `
      Built Node.js RESTful APIs using C Sharp and deployed
      containerized applications to AWS.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.requiredSkills).toEqual([
      'Node.js',
      'C#',
      'AWS',
      'Docker',
      'REST APIs',
      'CI/CD',
    ])

    expect(result.matchedSkills).toEqual([
      'Node.js',
      'C#',
      'AWS',
      'REST APIs',
    ])

    expect(result.missingSkills).toEqual([
      'Docker',
      'CI/CD',
    ])

    expect(result.percentMatched).toBe(66.7)
  })

  it('does not match Java inside JavaScript', () => {
    const jobDescription = `
      Applicants should have experience with Java and JavaScript.
    `

    const resumeText = `
      Developed frontend applications using JavaScript.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.matchedSkills).toEqual(['JavaScript'])
    expect(result.missingSkills).toEqual(['Java'])
    expect(result.percentMatched).toBe(50)
  })

  it('matches skills without regard to capitalization', () => {
    const jobDescription = `
      Experience with REACT, TYPESCRIPT, and AWS is required.
    `

    const resumeText = `
      Built applications using react, typescript, and aws.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.matchedSkills).toEqual([
      'React',
      'TypeScript',
      'AWS',
    ])

    expect(result.missingSkills).toEqual([])
    expect(result.percentMatched).toBe(100)
  })

  it('returns zero when the job description has no recognized skills', () => {
    const jobDescription = `
      We need a dependable team member with strong communication skills.
    `

    const resumeText = `
      Experienced professional with excellent communication skills.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.requiredSkills).toEqual([])
    expect(result.matchedSkills).toEqual([])
    expect(result.missingSkills).toEqual([])
    expect(result.percentMatched).toBe(0)

    expect(result.suggestions).toContain(
      'Add a longer job description so CareerForge can identify more required skills.'
    )
  })

  it('generates a strong-match suggestion for scores of 80 percent or higher', () => {
    const jobDescription = `
      The position requires React, TypeScript, Git, and Agile.
    `

    const resumeText = `
      Developed React and TypeScript applications using Git
      within an Agile team.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.percentMatched).toBe(100)

    expect(result.suggestions).toContain(
      'Your skills align well with this role. Tailor your summary and accomplishments to the position.'
    )
  })

  it('separates required and preferred skills', () => {
    const jobDescription = `
      Required Qualifications:
      React
      TypeScript
      Git

      Preferred Qualifications:
      AWS
      Docker
    `

    const resumeText = `
      Built React and TypeScript applications using Git
      and deployed projects to AWS.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.requiredSkills).toEqual([
      'React',
      'TypeScript',
      'Git',
    ])

    expect(result.preferredSkills).toEqual([
      'AWS',
      'Docker',
    ])

    expect(result.matchedRequiredSkills).toEqual([
      'React',
      'TypeScript',
      'Git',
    ])

    expect(result.missingRequiredSkills).toEqual([])

    expect(result.matchedPreferredSkills).toEqual(['AWS'])
    expect(result.missingPreferredSkills).toEqual(['Docker'])

    expect(result.requiredScore).toBe(100)
    expect(result.preferredScore).toBe(50)
    expect(result.percentMatched).toBe(90)
  })

  it('gives required skills priority over preferred skills', () => {
    const jobDescription = `
      Required Skills:
      AWS
      React

      Nice to Have:
      AWS
      Docker
    `

    const resumeText = `
      Built React applications using AWS.
    `

    const result = analyzeResume(resumeText, jobDescription)

    expect(result.requiredSkills).toEqual([
      'React',
      'AWS',
    ])

    expect(result.preferredSkills).toEqual([
      'Docker',
    ])

    expect(result.matchedRequiredSkills).toEqual([
      'React',
      'AWS',
    ])

    expect(result.matchedPreferredSkills).toEqual([])
    expect(result.missingPreferredSkills).toEqual(['Docker'])
  })
})
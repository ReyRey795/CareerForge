export function analyzeResume(
  resumeText: string,
  jobDescription: string
) {
  const knownSkills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Python',
    'Java',
    'Git',
    'AWS',
    'Docker',
    'Agile',
  ]

  function containsSkill(text: string, skill: string) {
    const pattern = new RegExp(`\\b${skill}\\b`, 'i')
    return pattern.test(text)
  }

  function generateSuggestions(
    requiredSkills: string[],
    matchedSkills: string[],
    missingSkills: string[],
    percentMatched: number
  ) {
    const suggestions: string[] = []

    if (requiredSkills.length === 0) {
      suggestions.push(
        'Add a longer job description so CareerForge can identify more required skills.'
      )

      return suggestions
    }

    if (missingSkills.length > 0) {
      suggestions.push(
        `Add relevant experience or projects that demonstrate: ${missingSkills.join(', ')}.`
      )
    }

    if (percentMatched < 50) {
      suggestions.push(
        'Focus your resume on the requirements most relevant to this position.'
      )
    }

    if (percentMatched >= 50 && percentMatched < 80) {
      suggestions.push(
        'Strengthen your matched skills with specific examples and measurable results.'
      )
    }

    if (percentMatched >= 80) {
      suggestions.push(
        'Your skills align well with this role. Tailor your summary and accomplishments to the position.'
      )
    }

    if (matchedSkills.length > 0) {
      suggestions.push(
        `Highlight your experience with ${matchedSkills.join(', ')} near the top of your resume.`
      )
    }

    suggestions.push(
      'Use measurable achievements such as percentages, time saved, revenue, or project size.'
    )

    return suggestions
  }

  const requiredSkills = knownSkills.filter((skill) =>
    containsSkill(jobDescription, skill)
  )

  const matchedSkills = requiredSkills.filter((skill) =>
    containsSkill(resumeText, skill)
  )

  const percentMatched =
    requiredSkills.length === 0
      ? 0
      : (matchedSkills.length / requiredSkills.length) * 100

  const missingSkills = requiredSkills.filter(
    (skill) => !matchedSkills.includes(skill)
  )

  const suggestions = generateSuggestions(
    requiredSkills,
    matchedSkills,
    missingSkills,
    percentMatched
  )

  return {
    percentMatched: Number(percentMatched.toFixed(1)),
    requiredSkills,
    matchedSkills,
    missingSkills,
    suggestions,
  }
}
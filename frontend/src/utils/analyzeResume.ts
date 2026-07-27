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

  const missingSkills = requiredSkills.filter((skill) =>
    !matchedSkills.includes(skill)
  )

  return {
    percentMatched: Number(percentMatched.toFixed(1)),
    requiredSkills,
    matchedSkills,
    missingSkills,
  }
}
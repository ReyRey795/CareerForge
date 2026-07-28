type SkillDefinition = {
  name: string
  aliases: string[]
}

export function analyzeResume(
  resumeText: string,
  jobDescription: string
) {
  const knownSkills: SkillDefinition[] = [
    {
      name: 'React',
      aliases: ['React', 'React.js', 'ReactJS'],
    },
    {
      name: 'TypeScript',
      aliases: ['TypeScript'],
    },
    {
      name: 'JavaScript',
      aliases: ['JavaScript', 'ECMAScript'],
    },
    {
      name: 'Node.js',
      aliases: ['Node.js', 'NodeJS'],
    },
    {
      name: 'Python',
      aliases: ['Python'],
    },
    {
      name: 'Java',
      aliases: ['Java'],
    },
    {
      name: 'C#',
      aliases: ['C#', 'C Sharp'],
    },
    {
      name: '.NET',
      aliases: ['.NET', 'dotnet'],
    },
    {
      name: 'FastAPI',
      aliases: ['FastAPI'],
    },
    {
      name: 'Git',
      aliases: ['Git'],
    },
    {
      name: 'GitHub',
      aliases: ['GitHub'],
    },
    {
      name: 'AWS',
      aliases: ['AWS', 'Amazon Web Services'],
    },
    {
      name: 'Docker',
      aliases: ['Docker'],
    },
    {
      name: 'PostgreSQL',
      aliases: ['PostgreSQL', 'Postgres'],
    },
    {
      name: 'SQL',
      aliases: ['SQL'],
    },
    {
      name: 'REST APIs',
      aliases: [
        'REST API',
        'REST APIs',
        'RESTful API',
        'RESTful APIs',
      ],
    },
    {
      name: 'CI/CD',
      aliases: ['CI/CD', 'CI-CD', 'CICD'],
    },
    {
      name: 'Agile',
      aliases: ['Agile'],
    },
    {
      name: 'Scrum',
      aliases: ['Scrum'],
    },
  ]

  function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  function createSkillPattern(alias: string) {
    const aliasPattern = alias
      .trim()
      .split(/\s+/)
      .map(escapeRegExp)
      .join('\\s+')

    return new RegExp(
      `(^|[^A-Za-z0-9])${aliasPattern}(?=$|[^A-Za-z0-9])`,
      'i'
    )
  }

  function containsSkill(text: string, aliases: string[]) {
    return aliases.some((alias) => {
      const pattern = createSkillPattern(alias)

      return pattern.test(text)
    })
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

  const requiredSkillDefinitions = knownSkills.filter((skill) =>
    containsSkill(jobDescription, skill.aliases)
  )

  const requiredSkills = requiredSkillDefinitions.map(
    (skill) => skill.name
  )

  const matchedSkills = requiredSkillDefinitions
    .filter((skill) =>
      containsSkill(resumeText, skill.aliases)
    )
    .map((skill) => skill.name)

  const missingSkills = requiredSkills.filter(
    (skill) => !matchedSkills.includes(skill)
  )

  const percentMatched =
    requiredSkills.length === 0
      ? 0
      : (matchedSkills.length / requiredSkills.length) * 100

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
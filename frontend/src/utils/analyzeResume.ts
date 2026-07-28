type SkillDefinition = {
  name: string
  aliases: string[]
}

type JobSection = 'general' | 'required' | 'preferred'

type JobDescriptionSections = {
  general: string
  required: string
  preferred: string
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

  function findSkills(text: string) {
    return knownSkills.filter((skill) =>
      containsSkill(text, skill.aliases)
    )
  }

  function matchSectionHeading(line: string) {
    const cleanedLine = line
      .trim()
      .replace(/^[-•*]\s*/, '')

    const requiredPattern =
      /^(required(?:\s+(?:skills|qualifications|experience))?|requirements|core requirements|minimum qualifications|basic qualifications|qualifications|must[-\s]?haves?|what we(?:'|’)re looking for)\s*(?::|—|-)?\s*(.*)$/i

    const preferredPattern =
      /^(preferred(?:\s+(?:skills|qualifications|experience))?|nice[-\s]?to[-\s]?haves?|bonus(?:\s+skills)?|desired qualifications|additional qualifications)\s*(?::|—|-)?\s*(.*)$/i

    const requiredMatch = cleanedLine.match(requiredPattern)

    if (requiredMatch) {
      return {
        section: 'required' as JobSection,
        content: requiredMatch[2].trim(),
      }
    }

    const preferredMatch = cleanedLine.match(preferredPattern)

    if (preferredMatch) {
      return {
        section: 'preferred' as JobSection,
        content: preferredMatch[2].trim(),
      }
    }

    return null
  }

  function isLikelyHeading(line: string) {
    const trimmedLine = line.trim()

    return (
      trimmedLine.length <= 60 &&
      trimmedLine.endsWith(':')
    )
  }

  function splitJobDescription(
    text: string
  ): JobDescriptionSections {
    const sections: Record<JobSection, string[]> = {
      general: [],
      required: [],
      preferred: [],
    }

    let currentSection: JobSection = 'general'

    const lines = text.split(/\r?\n/)

    lines.forEach((line) => {
      const trimmedLine = line.trim()

      if (!trimmedLine) {
        return
      }

      const headingMatch = matchSectionHeading(trimmedLine)

      if (headingMatch) {
        currentSection = headingMatch.section

        if (headingMatch.content) {
          sections[currentSection].push(headingMatch.content)
        }

        return
      }

      if (isLikelyHeading(trimmedLine)) {
        currentSection = 'general'
      }

      sections[currentSection].push(trimmedLine)
    })

    return {
      general: sections.general.join(' '),
      required: sections.required.join(' '),
      preferred: sections.preferred.join(' '),
    }
  }

  function calculateScore(
    requiredScore: number,
    preferredScore: number,
    requiredSkillCount: number,
    preferredSkillCount: number
  ) {
    if (
      requiredSkillCount > 0 &&
      preferredSkillCount > 0
    ) {
      return requiredScore * 0.8 + preferredScore * 0.2
    }

    if (requiredSkillCount > 0) {
      return requiredScore
    }

    if (preferredSkillCount > 0) {
      return preferredScore
    }

    return 0
  }

  function generateSuggestions(
    requiredSkills: string[],
    matchedRequiredSkills: string[],
    missingRequiredSkills: string[],
    preferredSkills: string[],
    matchedPreferredSkills: string[],
    missingPreferredSkills: string[],
    percentMatched: number
  ) {
    const suggestions: string[] = []

    const recognizedSkillCount =
      requiredSkills.length + preferredSkills.length

    if (recognizedSkillCount === 0) {
      suggestions.push(
        'Add a longer job description so CareerForge can identify more required skills.'
      )

      return suggestions
    }

    if (missingRequiredSkills.length > 0) {
      suggestions.push(
        `Add relevant experience or projects that demonstrate these required skills: ${missingRequiredSkills.join(', ')}.`
      )
    }

    if (missingPreferredSkills.length > 0) {
      suggestions.push(
        `If applicable, highlight experience with these preferred skills: ${missingPreferredSkills.join(', ')}.`
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

    const allMatchedSkills = [
      ...matchedRequiredSkills,
      ...matchedPreferredSkills,
    ]

    if (allMatchedSkills.length > 0) {
      suggestions.push(
        `Highlight your experience with ${allMatchedSkills.join(', ')} near the top of your resume.`
      )
    }

    suggestions.push(
      'Use measurable achievements such as percentages, time saved, revenue, or project size.'
    )

    return suggestions
  }

  const sections = splitJobDescription(jobDescription)

  const requiredSkillDefinitions = findSkills(
    `${sections.general} ${sections.required}`
  )

  const requiredSkillNames = new Set(
    requiredSkillDefinitions.map((skill) => skill.name)
  )

  const preferredSkillDefinitions = findSkills(
    sections.preferred
  ).filter((skill) => !requiredSkillNames.has(skill.name))

  const requiredSkills = requiredSkillDefinitions.map(
    (skill) => skill.name
  )

  const preferredSkills = preferredSkillDefinitions.map(
    (skill) => skill.name
  )

  const matchedRequiredSkills = requiredSkillDefinitions
    .filter((skill) =>
      containsSkill(resumeText, skill.aliases)
    )
    .map((skill) => skill.name)

  const missingRequiredSkills = requiredSkills.filter(
    (skill) => !matchedRequiredSkills.includes(skill)
  )

  const matchedPreferredSkills = preferredSkillDefinitions
    .filter((skill) =>
      containsSkill(resumeText, skill.aliases)
    )
    .map((skill) => skill.name)

  const missingPreferredSkills = preferredSkills.filter(
    (skill) => !matchedPreferredSkills.includes(skill)
  )

  const requiredScore =
    requiredSkills.length === 0
      ? 0
      : (matchedRequiredSkills.length /
          requiredSkills.length) *
        100

  const preferredScore =
    preferredSkills.length === 0
      ? 0
      : (matchedPreferredSkills.length /
          preferredSkills.length) *
        100

  const percentMatched = calculateScore(
    requiredScore,
    preferredScore,
    requiredSkills.length,
    preferredSkills.length
  )

  const suggestions = generateSuggestions(
    requiredSkills,
    matchedRequiredSkills,
    missingRequiredSkills,
    preferredSkills,
    matchedPreferredSkills,
    missingPreferredSkills,
    percentMatched
  )

  return {
    percentMatched: Number(percentMatched.toFixed(1)),
    requiredScore: Number(requiredScore.toFixed(1)),
    preferredScore: Number(preferredScore.toFixed(1)),
    requiredSkills,
    preferredSkills,
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    missingPreferredSkills,
    suggestions,

    // Temporary compatibility with the current App and results UI.
    matchedSkills: matchedRequiredSkills,
    missingSkills: missingRequiredSkills,
  }
}
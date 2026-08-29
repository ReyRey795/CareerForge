import {
  knownSkills,
  type SkillDefinition,
} from '../data/skills'

import {
  knownEducationRequirements,
  knownCertifications,
  type EducationDefinition,
  type EducationLevel,
  type CertificationDefinition,
} from '../data/qualifications'

type JobSection =
  | 'general'
  | 'required'
  | 'preferred'

type ExperienceCategory =
  | 'required'
  | 'preferred'

type JobDescriptionSections = {
  general: string
  required: string
  preferred: string
}

type ClassifiedSegment = {
  text: string
  section: JobSection
}

type YearMention = {
  years: number
  index: number
}

type SkillOccurrence = {
  skill: SkillDefinition
  index: number
}

type DetectedExperienceRequirement = {
  label: string
  skillName: string | null
  years: number
  category: ExperienceCategory
  sourceText: string
}

export type ExperienceRequirement = {
  label: string
  years: number
  category: ExperienceCategory
  resumeYears: number | null
  meetsRequirement: boolean
  sourceText: string
}

export type EducationRequirement = {
  label: string
  level: EducationLevel
  category: ExperienceCategory
  status:
    | 'completed'
    | 'in-progress'
    | 'not-found'
  resumeEducationLabel: string | null
  meetsRequirement: boolean
  allowsEquivalentExperience: boolean
  sourceText: string
}

export type CertificationRequirement = {
  label: string
  category: ExperienceCategory
  foundInResume: boolean
  sourceText: string
}

export function analyzeResume(
  resumeText: string,
  jobDescription: string
) {
  const skills: SkillDefinition[] = knownSkills

  const educationDefinitions:
    EducationDefinition[] =
      knownEducationRequirements

  const certificationDefinitions:
    CertificationDefinition[] =
      knownCertifications

  const numberWords: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
  }

  const yearNumberPattern =
    'one|two|three|four|five|six|seven|' +
    'eight|nine|ten|eleven|twelve|' +
    'thirteen|fourteen|fifteen|\\d{1,2}'

  function escapeRegExp(value: string) {
    return value.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )
  }

  function createSkillPattern(
    alias: string,
    flags = 'i'
  ) {
    const aliasPattern = alias
      .trim()
      .split(/\s+/)
      .map(escapeRegExp)
      .join('\\s+')

    return new RegExp(
      `(^|[^A-Za-z0-9])${aliasPattern}` +
        `(?=$|[^A-Za-z0-9])`,
      flags
    )
  }

  function containsSkill(
    text: string,
    aliases: string[]
  ) {
    return aliases.some((alias) => {
      const pattern = createSkillPattern(alias)

      return pattern.test(text)
    })
  }

  function findSkills(text: string) {
    return skills.filter((skill: SkillDefinition) =>
      containsSkill(text, skill.aliases)
    )
  }

  function findSkillOccurrences(
    text: string
  ): SkillOccurrence[] {
    const occurrences: SkillOccurrence[] = []
    const occurrenceKeys = new Set<string>()

    skills.forEach((skill: SkillDefinition) => {
      skill.aliases.forEach((alias: string) => {
        const pattern = createSkillPattern(
          alias,
          'gi'
        )

        let match = pattern.exec(text)

        while (match) {
          const index =
            match.index + match[1].length

          const key = `${skill.name}:${index}`

          if (!occurrenceKeys.has(key)) {
            occurrences.push({
              skill,
              index,
            })

            occurrenceKeys.add(key)
          }

          match = pattern.exec(text)
        }
      })
    })

    return occurrences.sort(
      (first, second) =>
        first.index - second.index
    )
  }

  function parseYearValue(value: string) {
    const normalizedValue =
      value.toLowerCase()

    if (normalizedValue in numberWords) {
      return numberWords[normalizedValue]
    }

    return Number.parseInt(
      normalizedValue,
      10
    )
  }

  function findYearMentions(
    text: string
  ): YearMention[] {
    const pattern = new RegExp(
      `\\b(${yearNumberPattern})` +
        `(?:\\s*(?:-|–|to)\\s*` +
        `(${yearNumberPattern}))?` +
        `\\s*\\+?\\s*(?:years?|yrs?)\\b`,
      'gi'
    )

    const mentions: YearMention[] = []
    let match = pattern.exec(text)

    while (match) {
      mentions.push({
        years: parseYearValue(match[1]),
        index: match.index,
      })

      match = pattern.exec(text)
    }

    return mentions
  }

  function splitIntoSegments(text: string) {
    return text
      .replace(/([.!?;])\s+/g, '$1\n')
      .split(/\r?\n|•/)
      .map((segment) => segment.trim())
      .filter(Boolean)
  }

  function splitResumeIntoSegments(
    text: string
  ): string[] {
    return text
      .replace(/\r\n/g, '\n')
      .split(/\n{2,}/)
      .map((paragraph) =>
        paragraph
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
      )
      .filter(Boolean)
      .flatMap((paragraph) =>
        splitIntoSegments(paragraph)
      )
  }

  function matchSectionHeading(
    line: string
  ) {
    const cleanedLine = line
      .trim()
      .replace(/^[-•*]\s*/, '')

    const requiredPattern =
      /^(required(?:\s+(?:skills|qualifications|experience))?|requirements|core requirements|minimum qualifications|basic qualifications|qualifications|must[-\s]?haves?|what we(?:'|’)re looking for)\s*(?::|—|-)?\s*(.*)$/i

    const preferredPattern =
      /^(preferred(?:\s+(?:skills|qualifications|experience))?|nice[-\s]?to[-\s]?haves?|bonus(?:\s+skills)?|desired qualifications|additional qualifications)\s*(?::|—|-)?\s*(.*)$/i

    const requiredMatch =
      cleanedLine.match(requiredPattern)

    if (requiredMatch) {
      return {
        section: 'required' as JobSection,
        content:
          requiredMatch[2]?.trim() ?? '',
      }
    }

    const preferredMatch =
      cleanedLine.match(preferredPattern)

    if (preferredMatch) {
      return {
        section: 'preferred' as JobSection,
        content:
          preferredMatch[2]?.trim() ?? '',
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

  function classifyJobDescription(
    text: string
  ): ClassifiedSegment[] {
    const segments: ClassifiedSegment[] = []

    let currentSection: JobSection =
      'general'

    const lines = text.split(/\r?\n/)

    lines.forEach((line) => {
      const trimmedLine = line.trim()

      if (!trimmedLine) {
        return
      }

      const headingMatch =
        matchSectionHeading(trimmedLine)

      if (headingMatch) {
        currentSection =
          headingMatch.section

        if (headingMatch.content) {
          splitIntoSegments(
            headingMatch.content
          ).forEach((segment) => {
            segments.push({
              text: segment,
              section: currentSection,
            })
          })
        }

        return
      }

      if (isLikelyHeading(trimmedLine)) {
        currentSection = 'general'
        return
      }

      splitIntoSegments(
        trimmedLine
      ).forEach((segment) => {
        segments.push({
          text: segment,
          section: currentSection,
        })
      })
    })

    return segments
  }

  function splitJobDescription(
    segments: ClassifiedSegment[]
  ): JobDescriptionSections {
    const sections: Record<
      JobSection,
      string[]
    > = {
      general: [],
      required: [],
      preferred: [],
    }

    segments.forEach((segment) => {
      sections[segment.section].push(
        segment.text
      )
    })

    return {
      general: sections.general.join(' '),
      required: sections.required.join(' '),
      preferred: sections.preferred.join(' '),
    }
  }

  function detectEducationRequirements(
    segments: ClassifiedSegment[]
  ): EducationRequirement[] {
    const detectedRequirements:
      EducationRequirement[] = []

    segments.forEach((segment) => {
      const category: ExperienceCategory =
        segment.section === 'preferred'
          ? 'preferred'
          : 'required'

      educationDefinitions.forEach(
        (definition) => {
          const isEducationRequirement =
            containsSkill(
              segment.text,
              definition.aliases
            )

          if (!isEducationRequirement) {
            return
          }

          detectedRequirements.push({
            label: definition.label,
            level: definition.level,
            category,
            status: 'not-found',
            resumeEducationLabel: null,
            meetsRequirement: false,
            allowsEquivalentExperience: false,
            sourceText: segment.text,
          })
        }
      )
    })

    return detectedRequirements
  }

  function evaluateEducationRequirements(
    detectedRequirements:
      EducationRequirement[],
    text: string
  ): EducationRequirement[] {
    const resumeSegments =
      splitResumeIntoSegments(text)

    return detectedRequirements.map(
      (requirement) => {
        const requiredEducation =
          educationDefinitions.find(
            (definition) =>
              definition.level ===
              requirement.level
          )

        if (!requiredEducation) {
          return requirement
        }

        const resumeEducation =
          educationDefinitions.find(
            (definition) =>
              definition.rank >=
                requiredEducation.rank &&
              resumeSegments.some(
                (segment) =>
                  containsSkill(
                    segment,
                    definition.aliases
                  )
              )
          )

        if (!resumeEducation) {
          return requirement
        }

        const matchingSegment =
          resumeSegments.find(
            (segment) =>
              containsSkill(
                segment,
                resumeEducation.aliases
              )
          )

        const isInProgress =
          matchingSegment !== undefined &&
          /\bin\s+progress\b/i.test(
            matchingSegment
          )

        return {
          ...requirement,
          status: isInProgress
            ? 'in-progress'
            : 'completed',
          resumeEducationLabel:
            resumeEducation.label,
          meetsRequirement:
            !isInProgress,
        }
      }
    )
  }

  function detectCertificationRequirements(
    segments: ClassifiedSegment[],
    text: string
  ): CertificationRequirement[] {
    const detectedRequirements:
      CertificationRequirement[] = []

    segments.forEach((segment) => {
      const category: ExperienceCategory =
        segment.section === 'preferred'
          ? 'preferred'
          : 'required'

      certificationDefinitions.forEach(
        (definition) => {
          const isCertificationRequirement =
            containsSkill(
              segment.text,
              definition.jobAliases
            )

          if (!isCertificationRequirement) {
            return
          }

          detectedRequirements.push({
            label: definition.label,
            category,
            foundInResume: containsSkill(
              text,
              definition.resumeAliases
            ),
            sourceText: segment.text,
          })
        }
      )
    })

    return detectedRequirements
  }

  function findClosestYear(
    skillIndex: number,
    yearMentions: YearMention[]
  ) {
    return yearMentions.reduce(
      (closest, current) => {
        const closestDistance = Math.abs(
          closest.index - skillIndex
        )

        const currentDistance = Math.abs(
          current.index - skillIndex
        )

        return currentDistance <
          closestDistance
          ? current
          : closest
      }
    )
  }

  function getGeneralExperienceLabel(
    text: string
  ) {
    if (
      /software development|software developer|software engineering|programming/i.test(
        text
      )
    ) {
      return 'Software development'
    }

    if (/engineering/i.test(text)) {
      return 'Engineering'
    }

    return 'General experience'
  }

  function detectExperienceRequirements(
    segments: ClassifiedSegment[]
  ): DetectedExperienceRequirement[] {
    const detectedRequirements:
      DetectedExperienceRequirement[] = []

    segments.forEach((segment) => {
      const yearMentions =
        findYearMentions(segment.text)

      if (yearMentions.length === 0) {
        return
      }

      const category: ExperienceCategory =
        segment.section === 'preferred'
          ? 'preferred'
          : 'required'

      const skillOccurrences =
        findSkillOccurrences(segment.text)

      if (skillOccurrences.length > 0) {
        skillOccurrences.forEach(
          (occurrence) => {
            const closestYear =
              findClosestYear(
                occurrence.index,
                yearMentions
              )

            detectedRequirements.push({
              label:
                occurrence.skill.name,
              skillName:
                occurrence.skill.name,
              years: closestYear.years,
              category,
              sourceText: segment.text,
            })
          }
        )

        return
      }

      const label =
        getGeneralExperienceLabel(
          segment.text
        )

      yearMentions.forEach((mention) => {
        detectedRequirements.push({
          label,
          skillName: null,
          years: mention.years,
          category,
          sourceText: segment.text,
        })
      })
    })

    const deduplicatedRequirements =
      new Map<
        string,
        DetectedExperienceRequirement
      >()

    detectedRequirements.forEach(
      (requirement) => {
        const key =
          `${requirement.category}:` +
          requirement.label

        const existingRequirement =
          deduplicatedRequirements.get(key)

        if (
          !existingRequirement ||
          requirement.years >
            existingRequirement.years
        ) {
          deduplicatedRequirements.set(
            key,
            requirement
          )
        }
      }
    )

    const requiredLabels = new Set(
      [...deduplicatedRequirements.values()]
        .filter(
          (requirement) =>
            requirement.category ===
            'required'
        )
        .map(
          (requirement) =>
            requirement.label
        )
    )

    return [
      ...deduplicatedRequirements.values(),
    ]
      .filter(
        (requirement) =>
          requirement.category ===
            'required' ||
          !requiredLabels.has(
            requirement.label
          )
      )
      .sort((first, second) => {
        if (
          first.category ===
          second.category
        ) {
          return first.label.localeCompare(
            second.label
          )
        }

        return first.category ===
          'required'
          ? -1
          : 1
      })
  }

  function findResumeYearsForSkill(
    resumeSegments: string[],
    skillName: string
  ) {
    const skill = skills.find(
      (knownSkill: SkillDefinition) =>
        knownSkill.name === skillName
    )

    if (!skill) {
      return null
    }

    const detectedYears: number[] = []

    resumeSegments.forEach((segment) => {
      const yearMentions =
        findYearMentions(segment)

      if (
        yearMentions.length === 0 ||
        !containsSkill(
          segment,
          skill.aliases
        )
      ) {
        return
      }

      const skillOccurrences =
        findSkillOccurrences(
          segment
        ).filter(
          (occurrence) =>
            occurrence.skill.name ===
            skillName
        )

      skillOccurrences.forEach(
        (occurrence) => {
          const closestYear =
            findClosestYear(
              occurrence.index,
              yearMentions
            )

          detectedYears.push(
            closestYear.years
          )
        }
      )
    })

    if (detectedYears.length === 0) {
      return null
    }

    return Math.max(...detectedYears)
  }

  function findGeneralResumeYears(
    resumeSegments: string[],
    label: string
  ) {
    const detectedYears: number[] = []

    resumeSegments.forEach((segment) => {
      const yearMentions =
        findYearMentions(segment)

      if (yearMentions.length === 0) {
        return
      }

      const isRelevant =
        label === 'Software development'
          ? /software|developer|development|programming/i.test(
              segment
            )
          : label === 'Engineering'
            ? /engineering|engineer/i.test(
                segment
              )
            : /experience|professional|worked|working/i.test(
                segment
              )

      if (!isRelevant) {
        return
      }

      yearMentions.forEach((mention) => {
        detectedYears.push(
          mention.years
        )
      })
    })

    if (detectedYears.length === 0) {
      return null
    }

    return Math.max(...detectedYears)
  }

  function evaluateExperienceRequirements(
    detectedRequirements:
      DetectedExperienceRequirement[],
    text: string
  ): ExperienceRequirement[] {
    const resumeSegments =
      splitResumeIntoSegments(text)

    return detectedRequirements.map(
      (requirement) => {
        const resumeYears =
          requirement.skillName
            ? findResumeYearsForSkill(
                resumeSegments,
                requirement.skillName
              )
            : findGeneralResumeYears(
                resumeSegments,
                requirement.label
              )

        return {
          label: requirement.label,
          years: requirement.years,
          category:
            requirement.category,
          resumeYears,
          meetsRequirement:
            resumeYears !== null &&
            resumeYears >=
              requirement.years,
          sourceText:
            requirement.sourceText,
        }
      }
    )
  }

  function calculateQualificationScore(
    matchedSkillCount: number,
    skillCount: number,
    metExperienceCount: number,
    experienceCount: number
  ) {
    const totalCriteria =
      skillCount + experienceCount

    if (totalCriteria === 0) {
      return 0
    }

    const metCriteria =
      matchedSkillCount +
      metExperienceCount

    return (
      (metCriteria / totalCriteria) *
      100
    )
  }

  function calculateOverallScore(
    requiredScore: number,
    preferredScore: number,
    requiredCriteriaCount: number,
    preferredCriteriaCount: number
  ) {
    if (
      requiredCriteriaCount > 0 &&
      preferredCriteriaCount > 0
    ) {
      return (
        requiredScore * 0.8 +
        preferredScore * 0.2
      )
    }

    if (requiredCriteriaCount > 0) {
      return requiredScore
    }

    if (preferredCriteriaCount > 0) {
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
    percentMatched: number,
    experienceRequirements:
      ExperienceRequirement[]
  ) {
    const suggestions: string[] = []

    const recognizedRequirementCount =
      requiredSkills.length +
      preferredSkills.length +
      experienceRequirements.length

    if (
      recognizedRequirementCount === 0
    ) {
      suggestions.push(
        'Add a longer job description so CareerForge can identify more required skills.'
      )

      return suggestions
    }

    if (
      missingRequiredSkills.length > 0
    ) {
      suggestions.push(
        `Add relevant experience or projects that demonstrate these required skills: ${missingRequiredSkills.join(', ')}.`
      )
    }

    if (
      missingPreferredSkills.length > 0
    ) {
      suggestions.push(
        `If applicable, highlight experience with these preferred skills: ${missingPreferredSkills.join(', ')}.`
      )
    }

    const unmetRequiredExperience =
      experienceRequirements.filter(
        (requirement) =>
          requirement.category ===
            'required' &&
          !requirement.meetsRequirement
      )

    const unmetPreferredExperience =
      experienceRequirements.filter(
        (requirement) =>
          requirement.category ===
            'preferred' &&
          !requirement.meetsRequirement
      )

    if (
      unmetRequiredExperience.length > 0
    ) {
      const requirementText =
        unmetRequiredExperience
          .map(
            (requirement) =>
              `${requirement.label} (${requirement.years}+ years)`
          )
          .join(', ')

      suggestions.push(
        `Make your years of experience clear for these requirements: ${requirementText}.`
      )
    }

    if (
      unmetPreferredExperience.length > 0
    ) {
      const requirementText =
        unmetPreferredExperience
          .map(
            (requirement) =>
              `${requirement.label} (${requirement.years}+ years)`
          )
          .join(', ')

      suggestions.push(
        `If applicable, document your experience for these preferred qualifications: ${requirementText}.`
      )
    }

    if (percentMatched < 50) {
      suggestions.push(
        'Focus your resume on the requirements most relevant to this position.'
      )
    }

    if (
      percentMatched >= 50 &&
      percentMatched < 80
    ) {
      suggestions.push(
        'Strengthen your matched qualifications with specific examples and measurable results.'
      )
    }

    if (percentMatched >= 80) {
      suggestions.push(
        'Your qualifications align well with this role. Tailor your summary and accomplishments to the position.'
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

  const classifiedSegments =
    classifyJobDescription(
      jobDescription
    )

  const sections =
    splitJobDescription(
      classifiedSegments
    )

  const requiredSkillDefinitions =
    findSkills(
      `${sections.general} ${sections.required}`
    )

  const requiredSkillNames = new Set(
    requiredSkillDefinitions.map(
      (skill: SkillDefinition) => skill.name
    )
  )

  const preferredSkillDefinitions =
    findSkills(
      sections.preferred
    ).filter(
      (skill: SkillDefinition) =>
        !requiredSkillNames.has(
          skill.name
        )
    )

  const requiredSkills =
    requiredSkillDefinitions.map(
      (skill: SkillDefinition) => skill.name
    )

  const preferredSkills =
    preferredSkillDefinitions.map(
      (skill: SkillDefinition) => skill.name
    )

  const matchedRequiredSkills =
    requiredSkillDefinitions
      .filter((skill: SkillDefinition) =>
        containsSkill(
          resumeText,
          skill.aliases
        )
      )
      .map((skill: SkillDefinition) => skill.name)

  const missingRequiredSkills =
    requiredSkills.filter(
      (skill) =>
        !matchedRequiredSkills.includes(
          skill
        )
    )

  const matchedPreferredSkills =
    preferredSkillDefinitions
      .filter((skill: SkillDefinition) =>
        containsSkill(
          resumeText,
          skill.aliases
        )
      )
      .map((skill: SkillDefinition) => skill.name)

  const missingPreferredSkills =
    preferredSkills.filter(
      (skill) =>
        !matchedPreferredSkills.includes(
          skill
        )
    )

  const detectedExperienceRequirements =
    detectExperienceRequirements(
      classifiedSegments
    )

  const experienceRequirements =
    evaluateExperienceRequirements(
      detectedExperienceRequirements,
      resumeText
    )

  const detectedEducationRequirements =
    detectEducationRequirements(
      classifiedSegments
    )

  const educationRequirements =
    evaluateEducationRequirements(
      detectedEducationRequirements,
      resumeText
    )

  const certificationRequirements =
    detectCertificationRequirements(
      classifiedSegments,
      resumeText
    )

  const requiredExperienceRequirements =
    experienceRequirements.filter(
      (requirement) =>
        requirement.category ===
        'required'
    )

  const preferredExperienceRequirements =
    experienceRequirements.filter(
      (requirement) =>
        requirement.category ===
        'preferred'
    )

  const metRequiredExperienceCount =
    requiredExperienceRequirements.filter(
      (requirement) =>
        requirement.meetsRequirement
    ).length

  const metPreferredExperienceCount =
    preferredExperienceRequirements.filter(
      (requirement) =>
        requirement.meetsRequirement
    ).length

  const requiredScore =
    calculateQualificationScore(
      matchedRequiredSkills.length,
      requiredSkills.length,
      metRequiredExperienceCount,
      requiredExperienceRequirements.length
    )

  const preferredScore =
    calculateQualificationScore(
      matchedPreferredSkills.length,
      preferredSkills.length,
      metPreferredExperienceCount,
      preferredExperienceRequirements.length
    )

  const requiredCriteriaCount =
    requiredSkills.length +
    requiredExperienceRequirements.length

  const preferredCriteriaCount =
    preferredSkills.length +
    preferredExperienceRequirements.length

  const percentMatched =
    calculateOverallScore(
      requiredScore,
      preferredScore,
      requiredCriteriaCount,
      preferredCriteriaCount
    )

  const suggestions =
    generateSuggestions(
      requiredSkills,
      matchedRequiredSkills,
      missingRequiredSkills,
      preferredSkills,
      matchedPreferredSkills,
      missingPreferredSkills,
      percentMatched,
      experienceRequirements
    )

  return {
    percentMatched: Number(
      percentMatched.toFixed(1)
    ),
    requiredScore: Number(
      requiredScore.toFixed(1)
    ),
    preferredScore: Number(
      preferredScore.toFixed(1)
    ),
    requiredSkills,
    preferredSkills,
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    missingPreferredSkills,
    experienceRequirements,
    educationRequirements,
    certificationRequirements,
    suggestions,

    matchedSkills:
      matchedRequiredSkills,
    missingSkills:
      missingRequiredSkills,
  }
}
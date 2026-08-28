export type EducationLevel =
  | 'high-school'
  | 'associate'
  | 'bachelor'
  | 'master'
  | 'doctorate'

export type EducationDefinition = {
  label: string
  level: EducationLevel
  rank: number
  aliases: string[]
}

export type CertificationDefinition = {
  label: string
  jobAliases: string[]
  resumeAliases: string[]
}

export const knownEducationRequirements:
  EducationDefinition[] = [
    {
      label: 'High school diploma or GED',
      level: 'high-school',
      rank: 1,
      aliases: [
        'high school diploma',
        'GED',
        'general educational development',
      ],
    },
    {
      label: "Associate's degree",
      level: 'associate',
      rank: 2,
      aliases: [
        "associate's degree",
        'associates degree',
        'associate degree',
        'associate of arts',
        'associate of science',
        'AA degree',
        'AS degree',
      ],
    },
    {
      label: "Bachelor's degree",
      level: 'bachelor',
      rank: 3,
      aliases: [
        "bachelor's degree",
        'bachelor’s degree',
        'bachelors degree',
        'bachelor degree',
        'bachelor of science',
        'bachelor of arts',
        'BS degree',
        'BA degree',
        'B.S.',
        'B.A.',
      ],
    },
    {
      label: "Master's degree",
      level: 'master',
      rank: 4,
      aliases: [
        "master's degree",
        'master’s degree',
        'masters degree',
        'master degree',
        'master of science',
        'master of arts',
        'MS degree',
        'MA degree',
        'M.S.',
        'M.A.',
        'MBA',
      ],
    },
    {
      label: 'Doctoral degree',
      level: 'doctorate',
      rank: 5,
      aliases: [
        'doctoral degree',
        'doctorate degree',
        'doctor of philosophy',
        'PhD',
        'Ph.D.',
      ],
    },
  ]

export const knownCertifications:
  CertificationDefinition[] = [
    {
      label: 'AWS certification',
      jobAliases: [
        'AWS certification',
        'AWS certified',
        'Amazon Web Services certification',
      ],
      resumeAliases: [
        'AWS certification',
        'AWS certified',
        'AWS Certified Cloud Practitioner',
        'AWS Certified Solutions Architect',
        'AWS Certified Developer',
        'AWS Certified SysOps Administrator',
      ],
    },
    {
      label: 'CompTIA Security+',
      jobAliases: [
        'CompTIA Security+',
        'Security+ certification',
        'Security Plus certification',
      ],
      resumeAliases: [
        'CompTIA Security+',
        'Security+ certified',
        'Security Plus certified',
      ],
    },
    {
      label: 'PMP',
      jobAliases: [
        'PMP certification',
        'Project Management Professional',
        'PMP',
      ],
      resumeAliases: [
        'PMP certification',
        'Project Management Professional',
        'PMP certified',
        'PMP',
      ],
    },
  ]
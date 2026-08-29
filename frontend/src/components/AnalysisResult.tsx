import type {
  CertificationRequirement,
  EducationRequirement,
} from '../utils/analyzeResume'

type AnalysisResultData = {
  score: number
  requiredScore: number
  preferredScore: number
  requiredSkills: string[]
  preferredSkills: string[]
  matchedRequiredSkills: string[]
  missingRequiredSkills: string[]
  matchedPreferredSkills: string[]
  missingPreferredSkills: string[]
  educationRequirements: EducationRequirement[]
  certificationRequirements: CertificationRequirement[]
  suggestions: string[]
}

type AnalysisResultProps = {
  result: AnalysisResultData
}

function getScoreLabel(score: number) {
  if (score >= 90) {
    return 'Excellent Match'
  }

  if (score >= 70) {
    return 'Good Match'
  }

  if (score >= 50) {
    return 'Fair Match'
  }

  return 'Needs Improvement'
}

function getScoreClass(score: number) {
  if (score >= 90) {
    return 'excellent'
  }

  if (score >= 70) {
    return 'good'
  }

  if (score >= 50) {
    return 'fair'
  }

  return 'needs-improvement'
}

function formatEducationStatus(
  requirement: EducationRequirement
) {
  if (requirement.status === 'completed') {
    return 'Completed'
  }

  if (requirement.status === 'in-progress') {
    return 'In progress'
  }

  return 'Not found'
}

function getEducationStatusClass(
  requirement: EducationRequirement
) {
  if (requirement.meetsRequirement) {
    return 'status-met'
  }

  if (requirement.status === 'in-progress') {
    return 'status-progress'
  }

  return 'status-unconfirmed'
}

function AnalysisResult({ result }: AnalysisResultProps) {
  const scoreLabel = getScoreLabel(result.score)
  const scoreClass = getScoreClass(result.score)

  const hasRequiredSkills =
    result.requiredSkills.length > 0

  const hasPreferredSkills =
    result.preferredSkills.length > 0

  const educationRequirements =
    result.educationRequirements ?? []

  const certificationRequirements =
    result.certificationRequirements ?? []

  return (
    <section className="analysis-result">
      <div className="results-heading">
        <div className="results-title">
          <span className="results-icon" aria-hidden="true">
            ↗
          </span>

          <div>
            <p className="section-kicker">
              Your comparison
            </p>
            <h2>Analysis Results</h2>
          </div>
        </div>

        <span className="results-status">
          Analysis complete
        </span>
      </div>

      <div className="results-grid">
        <article className="result-card score-card">
          <p className="result-card-label">
            Overall match score
          </p>

          <p className={`score ${scoreClass}`}>
            {result.score}%
          </p>

          <p className={`score-label ${scoreClass}`}>
            {scoreLabel}
          </p>

          <div
            className="score-bar"
            role="progressbar"
            aria-label="Overall resume match score"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={result.score}
          >
            <div
              className={`score-bar-fill ${scoreClass}`}
              style={{
                width: `${Math.min(result.score, 100)}%`,
              }}
            />
          </div>

          <div className="score-scale" aria-hidden="true">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>

          <div className="score-breakdown">
            {hasRequiredSkills && (
              <div className="score-breakdown-row">
                <div>
                  <span className="breakdown-label">
                    Required skills
                  </span>

                  {hasPreferredSkills && (
                    <span className="breakdown-weight">
                      80% weight
                    </span>
                  )}
                </div>

                <strong>
                  {result.requiredScore}%
                </strong>
              </div>
            )}

            {hasPreferredSkills && (
              <div className="score-breakdown-row preferred-breakdown">
                <div>
                  <span className="breakdown-label">
                    Preferred skills
                  </span>

                  {hasRequiredSkills && (
                    <span className="breakdown-weight">
                      20% weight
                    </span>
                  )}
                </div>

                <strong>
                  {result.preferredScore}%
                </strong>
              </div>
            )}
          </div>

          {hasRequiredSkills ? (
            <p className="score-details">
              <strong>
                {result.matchedRequiredSkills.length}
              </strong>{' '}
              of{' '}
              <strong>
                {result.requiredSkills.length}
              </strong>{' '}
              required skills matched
            </p>
          ) : (
            <p className="score-details">
              No required skills were detected.
            </p>
          )}
        </article>

        <article className="result-card skill-summary-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label">
                Required
              </p>

              <h3>Matched Skills</h3>
            </div>

            <span className="count-badge">
              {result.matchedRequiredSkills.length}
            </span>
          </div>

          {result.matchedRequiredSkills.length > 0 ? (
            <ul className="skill-list">
              {result.matchedRequiredSkills.map(
                (skill) => (
                  <li key={skill}>
                    <span className="list-icon success-icon">
                      ✓
                    </span>
                    {skill}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="empty-message">
              No required skills were matched.
            </p>
          )}
        </article>

        <article className="result-card skill-summary-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label">
                Required
              </p>

              <h3>Missing Skills</h3>
            </div>

            <span className="count-badge gold-badge">
              {result.missingRequiredSkills.length}
            </span>
          </div>

          {result.missingRequiredSkills.length > 0 ? (
            <ul className="skill-list">
              {result.missingRequiredSkills.map(
                (skill) => (
                  <li key={skill}>
                    <span className="list-icon missing-icon">
                      •
                    </span>
                    {skill}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="empty-message">
              No required skills appear to be missing.
            </p>
          )}
        </article>

        <article className="result-card skill-summary-card preferred-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label preferred-label">
                Preferred
              </p>

              <h3>Matched Skills</h3>
            </div>

            <span className="count-badge preferred-badge">
              {result.matchedPreferredSkills.length}
            </span>
          </div>

          {!hasPreferredSkills ? (
            <p className="empty-message">
              No preferred skills were detected in the job
              description.
            </p>
          ) : result.matchedPreferredSkills.length > 0 ? (
            <ul className="skill-list">
              {result.matchedPreferredSkills.map(
                (skill) => (
                  <li key={skill}>
                    <span className="list-icon preferred-icon">
                      ✓
                    </span>
                    {skill}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="empty-message">
              No preferred skills were matched.
            </p>
          )}
        </article>

        <article className="result-card skill-summary-card preferred-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label preferred-label">
                Preferred
              </p>

              <h3>Missing Skills</h3>
            </div>

            <span className="count-badge preferred-badge">
              {result.missingPreferredSkills.length}
            </span>
          </div>

          {!hasPreferredSkills ? (
            <p className="empty-message">
              No preferred skills were detected in the job
              description.
            </p>
          ) : result.missingPreferredSkills.length > 0 ? (
            <ul className="skill-list">
              {result.missingPreferredSkills.map(
                (skill) => (
                  <li key={skill}>
                    <span className="list-icon preferred-missing-icon">
                      •
                    </span>
                    {skill}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="empty-message">
              No preferred skills appear to be missing.
            </p>
          )}
        </article>

        <article className="result-card qualification-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label">
                Qualifications
              </p>

              <h3>Education Requirements</h3>
            </div>

            <span className="count-badge">
              {educationRequirements.length}
            </span>
          </div>

          {educationRequirements.length === 0 ? (
            <p className="empty-message">
              No recognized education requirements were
              detected.
            </p>
          ) : (
            <ul className="qualification-list">
              {educationRequirements.map(
                (requirement) => (
                  <li
                    className="qualification-item"
                    key={`${requirement.category}-${requirement.level}`}
                  >
                    <div className="qualification-item-heading">
                      <div>
                        <span
                          className={`qualification-category ${requirement.category}`}
                        >
                          {requirement.category}
                        </span>

                        <h4>
                          {requirement.label}
                        </h4>
                      </div>

                      <span
                        className={`qualification-status ${getEducationStatusClass(
                          requirement
                        )}`}
                      >
                        {formatEducationStatus(
                          requirement
                        )}
                      </span>
                    </div>

                    <div className="qualification-details">
                      <span>
                        Resume:{' '}
                        <strong>
                          {requirement.resumeEducationLabel ??
                            'Not found'}
                        </strong>
                      </span>

                      <span>
                        Requirement:{' '}
                        <strong>
                          {requirement.meetsRequirement
                            ? 'Met'
                            : 'Not confirmed'}
                        </strong>
                      </span>

                      {requirement.allowsEquivalentExperience && (
                        <span>
                          Equivalent experience:{' '}
                          <strong>
                            Allowed
                          </strong>
                        </span>
                      )}
                    </div>

                    <p className="qualification-source">
                      “{requirement.sourceText}”
                    </p>
                  </li>
                )
              )}
            </ul>
          )}

          <p className="qualification-note">
            Education requirements are reported separately
            and do not affect the current match score yet.
          </p>
        </article>

        <article className="result-card qualification-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label">
                Qualifications
              </p>

              <h3>Certification Requirements</h3>
            </div>

            <span className="count-badge">
              {certificationRequirements.length}
            </span>
          </div>

          {certificationRequirements.length === 0 ? (
            <p className="empty-message">
              No recognized certification requirements were
              detected.
            </p>
          ) : (
            <ul className="qualification-list">
              {certificationRequirements.map(
                (requirement) => (
                  <li
                    className="qualification-item"
                    key={`${requirement.category}-${requirement.label}`}
                  >
                    <div className="qualification-item-heading">
                      <div>
                        <span
                          className={`qualification-category ${requirement.category}`}
                        >
                          {requirement.category}
                        </span>

                        <h4>
                          {requirement.label}
                        </h4>
                      </div>

                      <span
                        className={`qualification-status ${
                          requirement.foundInResume
                            ? 'status-met'
                            : 'status-unconfirmed'
                        }`}
                      >
                        {requirement.foundInResume
                          ? 'Found in resume'
                          : 'Not found'}
                      </span>
                    </div>

                    <div className="qualification-details">
                      <span>
                        Resume match:{' '}
                        <strong>
                          {requirement.foundInResume
                            ? 'Confirmed'
                            : 'Not confirmed'}
                        </strong>
                      </span>
                    </div>

                    <p className="qualification-source">
                      “{requirement.sourceText}”
                    </p>
                  </li>
                )
              )}
            </ul>
          )}

          <p className="qualification-note">
            Certification requirements are reported
            separately and do not affect the current match
            score yet.
          </p>
        </article>

        <article className="result-card suggestions-card">
          <div className="result-card-heading">
            <div>
              <p className="result-category-label">
                Next steps
              </p>

              <h3>Suggestions</h3>
            </div>

            <span className="count-badge">
              {result.suggestions.length}
            </span>
          </div>

          {result.suggestions.length > 0 ? (
            <ul className="suggestion-list">
              {result.suggestions.map(
                (suggestion) => (
                  <li key={suggestion}>
                    <span className="suggestion-icon">
                      ✦
                    </span>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="empty-message">
              No suggestions are available.
            </p>
          )}
        </article>
      </div>
    </section>
  )
}

export default AnalysisResult
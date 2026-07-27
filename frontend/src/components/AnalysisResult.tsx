type AnalysisResultData = {
  score: number
  requiredSkills: string[]
  strengths: string[]
  missingSkills: string[]
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

function AnalysisResult({ result }: AnalysisResultProps) {
  const scoreLabel = getScoreLabel(result.score)
  const scoreClass = getScoreClass(result.score)

  return (
    <section className="analysis-result">
      <div className="results-heading">
        <div className="results-title">
          <span className="results-icon" aria-hidden="true">
            ↗
          </span>

          <div>
            <p className="section-kicker">Your comparison</p>
            <h2>Analysis Results</h2>
          </div>
        </div>

        <span className="results-status">Analysis complete</span>
      </div>

      <div className="results-grid">
        <article className="result-card score-card">
          <p className="result-card-label">Match score</p>

          <p className={`score ${scoreClass}`}>{result.score}%</p>
          <p className={`score-label ${scoreClass}`}>{scoreLabel}</p>

          <div
            className="score-bar"
            role="progressbar"
            aria-label="Resume match score"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={result.score}
          >
            <div
              className={`score-bar-fill ${scoreClass}`}
              style={{ width: `${Math.min(result.score, 100)}%` }}
            />
          </div>

          <div className="score-scale" aria-hidden="true">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>

          <p className="score-details">
            <strong>{result.strengths.length}</strong> of{' '}
            <strong>{result.requiredSkills.length}</strong> required skills
            matched
          </p>
        </article>

        <article className="result-card strengths-card">
          <div className="result-card-heading">
            <h3>Strengths</h3>
            <span className="count-badge">
              {result.strengths.length}
            </span>
          </div>

          {result.strengths.length > 0 ? (
            <ul className="skill-list">
              {result.strengths.map((strength) => (
                <li key={strength}>
                  <span className="list-icon success-icon">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">No matching skills were detected.</p>
          )}
        </article>

        <article className="result-card missing-card">
          <div className="result-card-heading">
            <h3>Missing Skills</h3>
            <span className="count-badge gold-badge">
              {result.missingSkills.length}
            </span>
          </div>

          {result.missingSkills.length > 0 ? (
            <ul className="skill-list">
              {result.missingSkills.map((skill) => (
                <li key={skill}>
                  <span className="list-icon missing-icon">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">
              No required skills appear to be missing.
            </p>
          )}
        </article>

        <article className="result-card suggestions-card">
          <div className="result-card-heading">
            <h3>Suggestions</h3>
            <span className="count-badge">
              {result.suggestions.length}
            </span>
          </div>

          {result.suggestions.length > 0 ? (
            <ul className="suggestion-list">
              {result.suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <span className="suggestion-icon">✦</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">No suggestions are available.</p>
          )}
        </article>
      </div>
    </section>
  )
}

export default AnalysisResult
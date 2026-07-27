type AnalysisResultData = {
  score: number
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

function AnalysisResult({ result }: AnalysisResultProps) {
  const scoreLabel = getScoreLabel(result.score)

  return (
    <section className="analysis-result">
      <h2>Analysis Results</h2>

      <div className="score-section">
        <h3>Match Score</h3>
        <p className="score">{result.score}%</p>
        <p className="score-label">{scoreLabel}</p>
      </div>

      <div>
        <h3>Strengths</h3>

        {result.strengths.length > 0 ? (
          <ul>
            {result.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        ) : (
          <p>No matching skills found.</p>
        )}
      </div>

      <div>
        <h3>Missing Skills</h3>

        {result.missingSkills.length > 0 ? (
          <ul>
            {result.missingSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No missing skills found.</p>
        )}
      </div>

      <div>
        <h3>Suggestions</h3>

        {result.suggestions.length > 0 ? (
          <ul>
            {result.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>
    </section>
  )
}

export default AnalysisResult
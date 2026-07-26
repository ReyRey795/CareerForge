type AnalysisResultProps = {
  score: number
  strengths: string[]
  missingSkills: string[]
  suggestions: string[]
}

function AnalysisResult({
  score,
  strengths,
  missingSkills,
  suggestions,
}: AnalysisResultProps) {
  return (
    <section>
      <h2>Analysis Result</h2>

      <p>Match Score: {score}%</p>

      <h3>Strengths</h3>
      <ul>
        {strengths.map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </ul>

      <h3>Missing Skills</h3>
      <ul>
        {missingSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Suggestions</h3>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </section>
  )
}

export default AnalysisResult
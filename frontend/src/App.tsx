import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ActionButton from './components/ActionButton'
import ResumeUpload from './components/ResumeUpload'
import JobDescription from './components/JobDescription'
import AnalysisResult from './components/AnalysisResult'

type AnalysisResultData = {
  score: number
  strengths: string[]
  missingSkills: string[]
  suggestions: string[]
}

function App() {

  // Use states below
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [showJobDescriptionForm, setShowJobDescriptionForm] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Empty strings below
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  // Analysis Comparison
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultData | null>(null)

  // Future backend response
  function handleAnalyze() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      return
    }

    setIsAnalyzing(true)
    setAnalysisResult(null)

    setTimeout(() => {
      setAnalysisResult({
        score: 82,
        strengths: [
          'React',
          'TypeScript',
          'Component architecture',
        ],

        missingSkills: [
          'AWS',
          'Docker',
          'CI/CD',
        ],

        suggestions: [
          'Add measurable achievements to your experience.',
          'Highlight relevant software projects.',
          'Connect your leadership experience to the position.',
        ],
      })

      setIsAnalyzing(false)
    }, 1500)
    
  }

  return (
    <main>
      <Header title="CareerForge" />

      <section>
        <h1>Build stronger job applications</h1>

        <p>
          Upload your resume, compare it with a job description,
          and receive AI-powered suggestions.
        </p>

        <ActionButton
          text="Upload Resume"
          onClick={() => setShowResumeForm(true)}
        />

        {showResumeForm && (
          <ResumeUpload
            resumeText={resumeText}
            setResumeText={setResumeText}
            onClose={() => setShowResumeForm(false)}
          />
        )}

        <ActionButton
          text="Paste Job Description"
          onClick={() => setShowJobDescriptionForm(true)}
        />

        {showJobDescriptionForm && (
          <JobDescription
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onClose={() => setShowJobDescriptionForm(false)}
          />
        )}

        <ActionButton
          text={isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          onClick={handleAnalyze}
        />
        {analysisResult && (
          <AnalysisResult
            score={analysisResult.score}
            strengths={analysisResult.strengths}
            missingSkills={analysisResult.missingSkills}
            suggestions={analysisResult.suggestions}
          />
        )}
      </section>
    </main>
  )
}

export default App
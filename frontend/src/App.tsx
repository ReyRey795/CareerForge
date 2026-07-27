import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ActionButton from './components/ActionButton'
import ResumeUpload from './components/ResumeUpload'
import JobDescription from './components/JobDescription'
import AnalysisResult from './components/AnalysisResult'
import { analyzeResume } from './utils/analyzeResume'

type AnalysisResultData = {
  score: number
  requiredSkills: string[]
  strengths: string[]
  missingSkills: string[]
  suggestions: string[]
}

function App() {
  // Form visibility
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [showJobDescriptionForm, setShowJobDescriptionForm] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // User input
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  // Analysis result
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultData | null>(null)

  function handleAnalyze() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      return
    }

    setIsAnalyzing(true)
    setAnalysisResult(null)

    setTimeout(() => {
      const result = analyzeResume(resumeText, jobDescription)

      setAnalysisResult({
        score: result.percentMatched,
        requiredSkills: result.requiredSkills,
        strengths: result.matchedSkills,
        missingSkills: result.missingSkills,
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
          Upload your resume, compare it with a job description, and receive
          AI-powered suggestions.
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

        {analysisResult && <AnalysisResult result={analysisResult} />}
      </section>
    </main>
  )
}

export default App
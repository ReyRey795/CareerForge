import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ActionButton from './components/ActionButton'
import ResumeUpload from './components/ResumeUpload'
import JobDescription from './components/JobDescription'
import AnalysisResult from './components/AnalysisResult'
import {
  analyzeResume,
  type ExperienceRequirement,
} from './utils/analyzeResume'

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
  experienceRequirements: ExperienceRequirement[]
  suggestions: string[]

  // Temporary compatibility with the older results component.
  strengths: string[]
  missingSkills: string[]
}

function App() {
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [showJobDescriptionForm, setShowJobDescriptionForm] =
    useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const [validationMessage, setValidationMessage] =
    useState<string | null>(null)

  const [analysisError, setAnalysisError] =
    useState<string | null>(null)

  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultData | null>(null)

  const hasResume = resumeText.trim().length > 0
  const hasJobDescription = jobDescription.trim().length > 0
  const canAnalyze = hasResume && hasJobDescription

  function handleResumeTextChange(text: string) {
    setResumeText(text)
    setValidationMessage(null)
    setAnalysisError(null)

    if (analysisResult) {
      setAnalysisResult(null)
    }
  }

  function handleJobDescriptionChange(text: string) {
    setJobDescription(text)
    setValidationMessage(null)
    setAnalysisError(null)

    if (analysisResult) {
      setAnalysisResult(null)
    }
  }

  function validateInputs() {
    if (!hasResume && !hasJobDescription) {
      return 'Add your resume and a job description before starting the analysis.'
    }

    if (!hasResume) {
      return 'Add your resume before starting the analysis.'
    }

    if (!hasJobDescription) {
      return 'Add a job description before starting the analysis.'
    }

    return null
  }

  function handleAnalyze() {
    if (isAnalyzing) {
      return
    }

    const validationError = validateInputs()

    if (validationError) {
      setValidationMessage(validationError)
      return
    }

    setValidationMessage(null)
    setAnalysisError(null)
    setIsAnalyzing(true)
    setAnalysisResult(null)
    setShowResumeForm(false)
    setShowJobDescriptionForm(false)

    window.setTimeout(() => {
      try {
        const result = analyzeResume(
          resumeText,
          jobDescription
        )

        const matchedRequiredSkills =
          result.matchedRequiredSkills ??
          result.matchedSkills ??
          []

        const missingRequiredSkills =
          result.missingRequiredSkills ??
          result.missingSkills ??
          []

        setAnalysisResult({
          score: result.percentMatched ?? 0,
          requiredScore: result.requiredScore ?? 0,
          preferredScore: result.preferredScore ?? 0,
          requiredSkills: result.requiredSkills ?? [],
          preferredSkills: result.preferredSkills ?? [],
          matchedRequiredSkills,
          missingRequiredSkills,
          matchedPreferredSkills:
            result.matchedPreferredSkills ?? [],
          missingPreferredSkills:
            result.missingPreferredSkills ?? [],
          experienceRequirements:
            result.experienceRequirements ?? [],
          suggestions: result.suggestions ?? [],

          // These keep the older AnalysisResult component safe.
          strengths: matchedRequiredSkills,
          missingSkills: missingRequiredSkills,
        })
      } catch (error) {
        console.error('CareerForge analysis failed:', error)

        setAnalysisError(
          'CareerForge could not complete this analysis. Check the browser console for more information.'
        )
      } finally {
        setIsAnalyzing(false)
      }
    }, 1500)
  }

  function handleReset() {
    setResumeText('')
    setJobDescription('')
    setAnalysisResult(null)
    setValidationMessage(null)
    setAnalysisError(null)
    setShowResumeForm(false)
    setShowJobDescriptionForm(false)
    setIsAnalyzing(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <main className="app">
      <Header title="CareerForge" />

      <div className="page-container">
        <section className="hero-section">
          <span className="eyebrow">
            <span aria-hidden="true">✦</span>
            Smart resume analysis
          </span>

          <h1>
            Build <span>stronger</span> job applications
          </h1>

          <p>
            Compare your resume with a job description, discover skill
            gaps, and receive clear recommendations designed to
            strengthen your application.
          </p>
        </section>

        <section
          className="workspace"
          aria-label="Resume analysis workspace"
        >
          <div className="input-grid">
            <article className="input-card">
              <div className="card-heading">
                <span className="step-number">1</span>

                <div className="card-title">
                  <p className="section-kicker">
                    Candidate profile
                  </p>

                  <h2>Your Resume</h2>

                  <p>
                    Paste your resume text to begin the comparison.
                  </p>
                </div>

                <span
                  className="card-symbol"
                  aria-hidden="true"
                >
                  ▤
                </span>
              </div>

              <div className="card-content">
                <ActionButton
                  text={
                    resumeText
                      ? 'Edit Resume'
                      : 'Add Resume'
                  }
                  onClick={() =>
                    setShowResumeForm(true)
                  }
                />

                {hasResume ? (
                  <p className="input-status">
                    <span aria-hidden="true">✓</span>
                    Resume added ·{' '}
                    {resumeText.length.toLocaleString()}{' '}
                    characters
                  </p>
                ) : (
                  <p className="input-pending">
                    Resume content has not been added.
                  </p>
                )}

                {showResumeForm && (
                  <ResumeUpload
                    resumeText={resumeText}
                    setResumeText={
                      handleResumeTextChange
                    }
                    onClose={() =>
                      setShowResumeForm(false)
                    }
                  />
                )}
              </div>
            </article>

            <article className="input-card">
              <div className="card-heading">
                <span className="step-number">2</span>

                <div className="card-title">
                  <p className="section-kicker">
                    Target opportunity
                  </p>

                  <h2>Job Description</h2>

                  <p>
                    Paste the job posting you want to compare.
                  </p>
                </div>

                <span
                  className="card-symbol"
                  aria-hidden="true"
                >
                  ◫
                </span>
              </div>

              <div className="card-content">
                <ActionButton
                  text={
                    jobDescription
                      ? 'Edit Job Description'
                      : 'Add Job Description'
                  }
                  onClick={() =>
                    setShowJobDescriptionForm(true)
                  }
                />

                {hasJobDescription ? (
                  <p className="input-status">
                    <span aria-hidden="true">✓</span>
                    Job description added ·{' '}
                    {jobDescription.length.toLocaleString()}{' '}
                    characters
                  </p>
                ) : (
                  <p className="input-pending">
                    Job description has not been added.
                  </p>
                )}

                {showJobDescriptionForm && (
                  <JobDescription
                    jobDescription={jobDescription}
                    setJobDescription={
                      handleJobDescriptionChange
                    }
                    onClose={() =>
                      setShowJobDescriptionForm(false)
                    }
                  />
                )}
              </div>
            </article>
          </div>

          <div className="analyze-section">
            <div className="analysis-actions">
              <ActionButton
                text={
                  isAnalyzing
                    ? 'Analyzing...'
                    : analysisResult
                      ? 'Analyze Again'
                      : 'Analyze Resume'
                }
                onClick={handleAnalyze}
                variant="primary"
                disabled={isAnalyzing}
              />

              {analysisResult && !isAnalyzing && (
                <ActionButton
                  text="Start New Analysis"
                  onClick={handleReset}
                />
              )}
            </div>

            <p className="privacy-note">
              <span aria-hidden="true">♙</span>
              Your text remains in this browser during the
              current analysis.
            </p>

            {validationMessage && (
              <p
                className="validation-message"
                role="alert"
                aria-live="polite"
              >
                <span aria-hidden="true">!</span>
                {validationMessage}
              </p>
            )}

            {analysisError && (
              <p
                className="analysis-error"
                role="alert"
                aria-live="assertive"
              >
                <span aria-hidden="true">!</span>
                {analysisError}
              </p>
            )}

            {!canAnalyze &&
              !validationMessage &&
              !analysisError && (
                <p className="analyze-hint">
                  Add both documents to begin the analysis.
                </p>
              )}
          </div>
        </section>

        {isAnalyzing && (
          <section
            className="loading-card"
            aria-live="polite"
          >
            <div className="loading-spinner" />

            <div>
              <strong>
                Analyzing your application
              </strong>

              <p>
                Comparing skills, experience requirements,
                and missing qualifications...
              </p>
            </div>
          </section>
        )}

        {analysisResult && (
          <AnalysisResult result={analysisResult} />
        )}
      </div>
    </main>
  )
}

export default App
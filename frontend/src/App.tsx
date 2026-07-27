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
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [showJobDescriptionForm, setShowJobDescriptionForm] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultData | null>(null)

  const canAnalyze =
    resumeText.trim().length > 0 && jobDescription.trim().length > 0

  function handleAnalyze() {
    if (!canAnalyze || isAnalyzing) {
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
            Compare your resume with a job description, discover skill gaps,
            and receive clear recommendations designed to strengthen your
            application.
          </p>
        </section>

        <section className="workspace" aria-label="Resume analysis workspace">
          <div className="input-grid">
            <article className="input-card">
              <div className="card-heading">
                <span className="step-number">1</span>

                <div className="card-title">
                  <p className="section-kicker">Candidate profile</p>
                  <h2>Your Resume</h2>
                  <p>Paste your resume text to begin the comparison.</p>
                </div>

                <span className="card-symbol" aria-hidden="true">
                  ▤
                </span>
              </div>

              <div className="card-content">
                <ActionButton
                  text={resumeText ? 'Edit Resume' : 'Add Resume'}
                  onClick={() => setShowResumeForm(true)}
                />

                {resumeText ? (
                  <p className="input-status">
                    <span aria-hidden="true">✓</span>
                    Resume added · {resumeText.length.toLocaleString()}{' '}
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
                    setResumeText={setResumeText}
                    onClose={() => setShowResumeForm(false)}
                  />
                )}
              </div>
            </article>

            <article className="input-card">
              <div className="card-heading">
                <span className="step-number">2</span>

                <div className="card-title">
                  <p className="section-kicker">Target opportunity</p>
                  <h2>Job Description</h2>
                  <p>Paste the job posting you want to compare.</p>
                </div>

                <span className="card-symbol" aria-hidden="true">
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
                  onClick={() => setShowJobDescriptionForm(true)}
                />

                {jobDescription ? (
                  <p className="input-status">
                    <span aria-hidden="true">✓</span>
                    Job description added ·{' '}
                    {jobDescription.length.toLocaleString()} characters
                  </p>
                ) : (
                  <p className="input-pending">
                    Job description has not been added.
                  </p>
                )}

                {showJobDescriptionForm && (
                  <JobDescription
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    onClose={() => setShowJobDescriptionForm(false)}
                  />
                )}
              </div>
            </article>
          </div>

          <div className="analyze-section">
            <ActionButton
              text={isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              onClick={handleAnalyze}
              variant="primary"
              disabled={!canAnalyze || isAnalyzing}
            />

            <p className="privacy-note">
              <span aria-hidden="true">♙</span>
              Your text remains in this browser during the current analysis.
            </p>

            {!canAnalyze && (
              <p className="analyze-hint">
                Add both documents to activate the analysis.
              </p>
            )}
          </div>
        </section>

        {isAnalyzing && (
          <section className="loading-card" aria-live="polite">
            <div className="loading-spinner" />
            <div>
              <strong>Analyzing your application</strong>
              <p>Comparing required, matching, and missing skills...</p>
            </div>
          </section>
        )}

        {analysisResult && <AnalysisResult result={analysisResult} />}
      </div>
    </main>
  )
}

export default App
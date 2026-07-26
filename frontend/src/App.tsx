import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ActionButton from './components/ActionButton'
import ResumeUpload from './components/ResumeUpload'
import JobDescription from './components/JobDescription'

function App() {

  // Use states below
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [showJobDescriptionForm, setShowJobDescriptionForm] = useState(false)

  // Empty strings below
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

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

        {/* Placeholder until job description input is implemented */}
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

        {/* Placeholder until resume analysis is implemented */}
        <button type="button">
          Analyze Resume
        </button>
      </section>
    </main>
  )
}

export default App
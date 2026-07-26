import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ActionButton from './components/ActionButton'
import ResumeUpload from './components/ResumeUpload'

function App() {
  const [showForm, setShowForm] = useState(false)

  // App owns the resume text so it can be shared with future
  // analysis, comparison, and cover letter features.
  const [resumeText, setResumeText] = useState('')

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
          onClick={() => setShowForm(true)}
        />

        {showForm && (
          <ResumeUpload
            resumeText={resumeText}
            setResumeText={setResumeText}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Placeholder until job description input is implemented */}
        <button type="button">
          Paste Job Description
        </button>

        {/* Placeholder until resume analysis is implemented */}
        <button type="button">
          Analyze Resume
        </button>
      </section>
    </main>
  )
}

export default App
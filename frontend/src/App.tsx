import { useState } from 'react'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main>
      <header>
        <p>CareerForge</p>
      </header>

      <section>
        <h1>Build stronger job applications</h1>

        <p>
          Upload your resume, compare it with a job description,
          and receive AI-powered suggestions.
        </p>

        <button 
          type="button"
          onClick={() => setShowForm(true)}
        > 
          Upload Resume
        </button>

        {showForm && (
          <section>
            <h2>Add your resume</h2>

            <p>
              Upload an existing resume or paste your resume text below.
            </p>

            <button type="button">
              Choose Resume File
            </button>

            <textarea
              placeholder="Paste your resume here"
              rows={10}
            />

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </section>
        )}

        <button type="button">Paste Job Description</button>

        <button type="button">Analyze Resume</button>
      </section>
    </main>
  )
}

export default App
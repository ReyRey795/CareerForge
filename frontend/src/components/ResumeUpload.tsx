// ==========================
// Imports
// ==========================
import { useState } from 'react'

// ==========================
// Props
// App controls when this component is displayed.
// ==========================
type ResumeUploadProps = {
  onClose: () => void
}

// ==========================
// Resume Upload
// Allows users to upload or paste their resume.
// ==========================
function ResumeUpload({ onClose }: ResumeUploadProps) {
  // Resume text is currently local to this component.
  // It will later be lifted to App so it can be shared with
  // resume analysis and other features.
  const [resumeText, setResumeText] = useState('')

  return (
    <section>
      <h2>Add your resume</h2>

      <p>
        Upload an existing resume or paste your resume text below.
      </p>

      {/* Placeholder until file upload is implemented */}
      <button type="button">
        Choose Resume File
      </button>

      <textarea
        value={resumeText}
        onChange={(event) => setResumeText(event.target.value)}
        placeholder="Paste your resume here"
        rows={10}
      />

      <button
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </section>
  )
}

export default ResumeUpload
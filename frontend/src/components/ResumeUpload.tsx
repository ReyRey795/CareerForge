date ResumeUpload.tsx to this:

import { useState } from 'react'

type ResumeUploadProps = {
  onClose: () => void
}

function ResumeUpload({ onClose }: ResumeUploadProps) {
  const [resumeText, setResumeText] = useState('')

  return (
    <section>
      <h2>Add your resume</h2>

      <p>
        Upload an existing resume or paste your resume text below.
      </p>

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
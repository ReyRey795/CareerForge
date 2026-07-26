import { useState } from 'react'

function ResumeUpload() {
  const [resumeText, setResumeText] = useState('')

  return (
    <section>
      <h2>Upload your resume</h2>

      <p>
        Upload a resume file or paste your resume text below.
      </p>

      <textarea
        value={resumeText}
        onChange={(event) => setResumeText(event.target.value)}
        placeholder="Paste your resume here"
        rows={12}
      />
    </section>
  )
}

export default ResumeUpload
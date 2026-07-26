type ResumeUploadProps = {
  // App owns the resume text so it can be shared with future features.
  resumeText: string
  setResumeText: (text: string) => void
  onClose: () => void
}

function ResumeUpload({
  resumeText,
  setResumeText,
  onClose,
}: ResumeUploadProps) {
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
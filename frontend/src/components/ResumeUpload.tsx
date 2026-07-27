type ResumeUploadProps = {
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
    <div className="document-editor">
      <div className="editor-heading">
        <div>
          <h3>Resume Content</h3>
          <p>Paste the text from your current resume.</p>
        </div>

        <button
          className="close-button"
          type="button"
          onClick={onClose}
          aria-label="Close resume editor"
        >
          ×
        </button>
      </div>

      <label className="field-label" htmlFor="resume-text">
        Resume text
      </label>

      <textarea
        id="resume-text"
        value={resumeText}
        onChange={(event) => setResumeText(event.target.value)}
        placeholder="Paste your resume here..."
        rows={12}
      />

      <div className="editor-footer">
        <span>{resumeText.length.toLocaleString()} characters</span>

        <button className="done-button" type="button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}

export default ResumeUpload
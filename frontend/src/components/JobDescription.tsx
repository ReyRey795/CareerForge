type JobDescriptionProps = {
  jobDescription: string
  setJobDescription: (text: string) => void
  onClose: () => void
}

function JobDescription({
  jobDescription,
  setJobDescription,
  onClose,
}: JobDescriptionProps) {
  return (
    <div className="document-editor">
      <div className="editor-heading">
        <div>
          <h3>Job Description</h3>
          <p>Paste the complete posting for the position.</p>
        </div>

        <button
          className="close-button"
          type="button"
          onClick={onClose}
          aria-label="Close job description editor"
        >
          ×
        </button>
      </div>

      <label className="field-label" htmlFor="job-description-text">
        Job description text
      </label>

      <textarea
        id="job-description-text"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste the job description here..."
        rows={12}
      />

      <div className="editor-footer">
        <span>{jobDescription.length.toLocaleString()} characters</span>

        <button className="done-button" type="button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}

export default JobDescription
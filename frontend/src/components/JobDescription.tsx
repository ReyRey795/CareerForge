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
    <section>
      <h2>Job Description</h2>

      <textarea
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste the job description here"
      />

      <button type="button" onClick={onClose}>
        Close
      </button>
    </section>
  )
}

export default JobDescription
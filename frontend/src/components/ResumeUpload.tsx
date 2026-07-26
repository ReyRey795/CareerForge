// ==========================
// Imports
// Import the useState Hook so this component can remember
// the text the user types into the textarea.
// ==========================
import { useState } from 'react'

// ==========================
// Props Type
// Defines the information this component expects to receive
// from its parent component.
// ==========================
type ResumeUploadProps = {
  // Function used to close this component.
  // The actual logic lives in App and is passed down as a prop.
  onClose: () => void
}

// ==========================
// Component
// Allows the user to upload or paste their resume.
// This component manages its own resume text while relying
// on App to control when it is shown or hidden.
// ==========================
function ResumeUpload({ onClose }: ResumeUploadProps) {

  // ==========================
  // State
  // Stores the current contents of the textarea.
  // Because React owns this value, the textarea is a
  // controlled component.
  // ==========================
  const [resumeText, setResumeText] = useState('')

  return (
    <section>
      <h2>Add your resume</h2>

      <p>
        Upload an existing resume or paste your resume text below.
      </p>

      {/* Placeholder for future file upload functionality. */}
      <button type="button">
        Choose Resume File
      </button>

      {/* 
        Controlled textarea:
        - value displays the current state.
        - onChange updates the state whenever the user types.
      */}
      <textarea
        value={resumeText}
        onChange={(event) => setResumeText(event.target.value)}
        placeholder="Paste your resume here"
        rows={10}
      />

      {/* Call the function passed from App to hide this component. */}
      <button
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </section>
  )
}

// Export the component so it can be imported into other files.
export default ResumeUpload
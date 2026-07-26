import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ActionButton from './components/ActionButton'
import ResumeUpload from './components/ResumeUpload'

function App() {
  // Creates a piece of state called "showForm".
  // showForm starts as false, meaning the ResumeUpload component
  // is hidden until the user clicks the button.
  //
  // setShowForm is the function used to update that value.
  const [showForm, setShowForm] = useState(false)

  return (
    <main>
      {/* Reusable Header component */}
      <Header title="CareerForge" />

      <section>
        <h1>Build stronger job applications</h1>

        <p>
          Upload your resume, compare it with a job description,
          and receive AI-powered suggestions.
        </p>

        {/* Reusable button component.
            When clicked, showForm becomes true,
            causing ResumeUpload to appear. */}
        <ActionButton
          text="Upload Resume"
          onClick={() => setShowForm(true)}
        />

        {/* Conditional Rendering
            The ResumeUpload component is only displayed
            when showForm is true.

            && means:
            "If the condition on the left is true,
            render the JSX on the right." */}
        {showForm && (
          <ResumeUpload
            // Passes the onClose function down as a prop.
            // When ResumeUpload calls onClose(),
            // showForm becomes false and the form disappears.
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Placeholder button for future feature */}
        <button type="button">Paste Job Description</button>

        {/* Placeholder button for future feature */}
        <button type="button">Analyze Resume</button>
      </section>
    </main>
  )
}

export default App
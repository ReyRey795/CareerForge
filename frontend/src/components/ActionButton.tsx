// ==========================
// Props Type
// Defines the information this component can receive from its parent.
// ==========================
type ActionButtonProps = {
  // Text displayed inside the button.
  text: string

  // Optional function to run when the button is clicked.
  onClick?: () => void
}

// ==========================
// Component
// A reusable button that can display different text and perform
// different actions depending on the props it receives.
// ==========================
function ActionButton({ text, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"

      // If an onClick function was passed in, call it when the button is clicked.
      onClick={onClick}
    >
      {/* Display the text provided by the parent component. */}
      {text}
    </button>
  )
}

// Make this component available to other files.
export default ActionButton
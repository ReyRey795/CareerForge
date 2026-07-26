// ==========================
// Props Type
// Defines the information this component expects to receive
// from its parent component.
// ==========================
type HeaderProps = {
  // The title that will be displayed in the header.
  title: string
}

// ==========================
// Component
// Displays the application's header.
// Making the header its own component allows it to be reused
// across multiple pages without rewriting the same code.
// ==========================
function Header({ title }: HeaderProps) {
  return (
    <header>
      {/* Display the title passed in from the parent component. */}
      <p>{title}</p>
    </header>
  )
}

// Export the component so it can be imported into other files.
export default Header
type ActionButtonProps = {
  text: string
  onClick?: () => void
}

function ActionButton({ text, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ActionButton
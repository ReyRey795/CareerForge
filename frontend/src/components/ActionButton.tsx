type ActionButtonProps = {
  text: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

function ActionButton({
  text,
  onClick,
  variant = 'secondary',
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      className={`action-button action-button-${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {variant === 'primary' && (
        <span className="button-spark" aria-hidden="true">
          ✦
        </span>
      )}

      {text}
    </button>
  )
}

export default ActionButton
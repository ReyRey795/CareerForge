type HeaderProps = {
  title: string
}

function Header({ title }: HeaderProps) {
  return (
    <header>
      <p>{title}</p>
    </header>
  )
}

export default Header
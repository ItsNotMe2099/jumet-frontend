interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function CloseSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8L24 24" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8 24L24 8" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


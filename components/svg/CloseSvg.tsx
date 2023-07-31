interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function CloseSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 18L18 6" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  )
}


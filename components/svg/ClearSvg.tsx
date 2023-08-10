interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function ClearSvg(props: Props) {
  return (
    <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L12 12" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12L12 4" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}


interface Props {
  className?: string
  color?: string
  onClick?: () => void
}

export default function NewCloseSvg(props: Props) {
  return (
    <svg className={props.className} onClick={props.onClick} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8L32 32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32L32 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


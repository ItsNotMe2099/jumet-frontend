interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function ChevronDownSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.8008 9.60002L12.0008 14.4L7.20078 9.60002" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


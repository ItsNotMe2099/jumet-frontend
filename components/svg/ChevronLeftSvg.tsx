interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function ChevronLeftSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4016 16.8L9.60156 12L14.4016 7.20005" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


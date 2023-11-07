interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function ChevronRightSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.59844 7.19995L14.3984 12L9.59844 16.8" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


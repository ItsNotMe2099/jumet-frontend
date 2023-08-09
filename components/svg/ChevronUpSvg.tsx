interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function ChevronUpSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.19922 14.4001L11.9992 9.6001L16.7992 14.4001" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


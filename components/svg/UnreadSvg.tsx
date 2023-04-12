interface Props {
  className?: string
  color: string
}

export default function UnreadSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12.5L10.3282 17L19 8" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


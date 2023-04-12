interface Props {
  className?: string
  color: string
}

export default function ReadSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12.5L8.32824 17L17 8" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12.3281 17L20.9999 8" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


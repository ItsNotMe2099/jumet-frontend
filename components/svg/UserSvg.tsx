interface Props {
  className?: string
  color: string
}

export default function UserSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="6" r="4" stroke={props.color} stroke-width="1.5" />
      <ellipse cx="12" cy="17" rx="7" ry="4" stroke={props.color} stroke-width="1.5" />
    </svg>
  )
}


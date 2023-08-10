interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function CalendarSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_2866_43268)">
        <path d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 3V7" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8 3V7" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 11H20" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11 15H12" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15V18" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2866_43268">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}


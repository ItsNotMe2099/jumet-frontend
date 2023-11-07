interface Props {
  className?: string
  color: string
}

export default function PlusSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2798_6618)">
        <path d="M12 5V19" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5 12H19" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2798_6618">
          <rect width="24" height="24" fill={props.color} />
        </clipPath>
      </defs>
    </svg>
  )
}


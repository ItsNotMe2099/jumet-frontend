interface Props {
  className?: string
  color: string
}

export default function ShareSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1888_31311)">
        <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8.69922 10.7L15.2992 7.30005" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8.69922 13.3L15.2992 16.7" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1888_31311">
          <rect width="24" height="24" fill={props.color} />
        </clipPath>
      </defs>
    </svg>

  )
}


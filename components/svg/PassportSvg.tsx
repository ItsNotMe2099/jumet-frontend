interface Props {
  color?: string
  className?: string
}

export default function PassportSvg(props: Props) {
  return (
  <svg  className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4953_19577)">
      <path d="M3 19.0007C4.36817 18.2108 5.92017 17.7949 7.5 17.7949C9.07983 17.7949 10.6318 18.2108 12 19.0007C13.3682 18.2108 14.9202 17.7949 16.5 17.7949C18.0798 17.7949 19.6318 18.2108 21 19.0007" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6.00069C4.36817 5.21078 5.92017 4.79492 7.5 4.79492C9.07983 4.79492 10.6318 5.21078 12 6.00069C13.3682 5.21078 14.9202 4.79492 16.5 4.79492C18.0798 4.79492 19.6318 5.21078 21 6.00069" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6V19" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V19" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 6V19" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_4953_19577">
        <rect width="24" height="24" fill={props.color}/>
      </clipPath>
    </defs>
  </svg>
)
}


interface Props {
  className?: string
  color: string
}

export default function MenuSvg(props: Props) {
  return (
    <svg className={props.className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1921_695)">
        <path d="M5.33203 8H26.6654" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.33203 16H26.6654" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.33203 24H26.6654" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1921_695">
          <rect width="32" height="32" fill={props.color} />
        </clipPath>
      </defs>
    </svg>
  )
}

interface Props {
  className?: string
  color: string
}

export default function ReloadSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_4140_13928)">
        <path d="M20 11.0002C19.7554 9.24041 18.9391 7.60985 17.6766 6.35969C16.4142 5.10953 14.7758 4.30911 13.0137 4.08175C11.2516 3.85438 9.46362 4.21268 7.9252 5.10144C6.38678 5.9902 5.18325 7.36013 4.5 9.00019M4 5.00019V9.00019H8" stroke={props.color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 13C4.24456 14.7598 5.06093 16.3903 6.32336 17.6405C7.58579 18.8907 9.22424 19.6911 10.9863 19.9184C12.7484 20.1458 14.5364 19.7875 16.0748 18.8988C17.6132 18.01 18.8168 16.6401 19.5 15M20 19V15H16" stroke={props.color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_4140_13928">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}


interface Props {
  className?: string
  color: string
  onClick?: () => void
}

export default function EditSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_2912_6421)">
        <path d="M12 15.0001L20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 5L19 8" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.00246 7.06982C7.2535 7.3261 5.66618 8.23439 4.55909 9.61238C3.45199 10.9904 2.90704 12.7361 3.03361 14.4992C3.16018 16.2623 3.9489 17.9123 5.24147 19.118C6.53405 20.3238 8.23482 20.996 10.0025 20.9998C11.6856 20.9996 13.3123 20.3932 14.5848 19.2915C15.8573 18.1898 16.6904 16.6666 16.9315 15.0008" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2912_6421">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}


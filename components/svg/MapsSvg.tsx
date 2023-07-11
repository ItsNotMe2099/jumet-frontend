interface Props {
  className?: string
  color: string
}

export default function MapsSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2675_52358)">
        <path d="M12 18.5L9 17L3 20V7L9 4L15 7L21 4V11.5" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 4V17" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15 7V12.5" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M21.121 20.1212C21.5406 19.7016 21.8265 19.1671 21.9423 18.5851C22.0581 18.0031 21.9988 17.3999 21.7717 16.8517C21.5447 16.3034 21.1602 15.8349 20.6668 15.5052C20.1734 15.1755 19.5934 14.9995 19 14.9995C18.4066 14.9995 17.8266 15.1755 17.3332 15.5052C16.8398 15.8349 16.4553 16.3034 16.2283 16.8517C16.0012 17.3999 15.9419 18.0031 16.0577 18.5851C16.1735 19.1671 16.4594 19.7016 16.879 20.1212C17.297 20.5402 18.004 21.1662 19 22.0002C20.051 21.1102 20.759 20.4842 21.121 20.1212Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19 18V18.01" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2675_52358">
          <rect width="24" height="24" fill={props.color} />
        </clipPath>
      </defs>
    </svg>
  )
}

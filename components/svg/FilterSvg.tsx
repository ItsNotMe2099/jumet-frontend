interface Props {
  className?: string
  color: string
}

export default function FilterSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7 12H17" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 18H14" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  )
}


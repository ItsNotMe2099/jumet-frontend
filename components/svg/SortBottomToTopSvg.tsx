interface Props {
  className?: string
  color: string
}

export default function SortBottomToTopSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18H13" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M6 13H13" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M8 8H13" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M17 4V20L20 16" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


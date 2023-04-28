interface Props {
  className?: string
  color: string
}

export default function CheckBoxSvg(props: Props) {
  return (
    <svg className={props.className} width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 4L4 7L10 1" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}


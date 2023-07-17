
interface Props {
  className?: string
  color: string
}

export default function DotSvg(props: Props) {

  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6" fill={props.color} />
    </svg>
  )
}


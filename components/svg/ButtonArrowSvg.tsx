interface Props {
  color: string
  className?: string
}

export default function ButtonArrowSvg(props: Props) {
  return (
    <svg className={props.className} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.589844 11.08L5.16984 6.5L0.589844 1.91L1.99984 0.5L7.99984 6.5L1.99984 12.5L0.589844 11.08Z" fill={props.color} />
    </svg>
  )
}


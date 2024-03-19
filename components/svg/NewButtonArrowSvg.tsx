interface Props {
  color: string
  className?: string
}

export default function NewButtonArrowSvg(props: Props) {
  return (
    <svg className={props.className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 -8.74228e-07C31 -3.93402e-07 40 9 40 20C40 31 31 40 20 40C9 40 -1.35505e-06 31 -8.74228e-07 20C-3.93402e-07 9 9 -1.35505e-06 20 -8.74228e-07ZM20 37C29.4 37 37 29.4 37 19.8C37 10.2 29.4 3 20 3C10.6 3 3 10.6 3 20C3 29.4 10.6 37 20 37Z" fill="white" />
      <path d="M16.4 14.2L22.2 20L16.4 25.8C15.8 26.4 15.8 27.4 16.4 28C17 28.6 18 28.6 18.6 28L26.6 20L18.6 12C18 11.4 17 11.4 16.4 12C15.8 12.4 15.6 13.4 16.4 14.2C16.2 14 16.2 14.2 16.4 14.2Z" fill="white" />
    </svg>
  )
}


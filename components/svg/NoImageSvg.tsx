interface Props {
  className?: string
  color: string
}

export default function NoImageSvg(props: Props) {
  return (
    <svg className={props.color} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M3 12.4501L4.57643 11.0708C5.39657 10.3531 6.63265 10.3943 7.40324 11.1649L11.264 15.0256C11.8825 15.6441 12.8561 15.7285 13.5718 15.2255L13.8401 15.0369C14.87 14.3132 16.2632 14.397 17.1988 15.2391L20.1 17.8501" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M21.0015 3.00002L15.6016 8.4M15.6015 3L21.0015 8.39998" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
    </svg>
  )
}


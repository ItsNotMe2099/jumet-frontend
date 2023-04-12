interface Props {
  className?: string
  color: string
}

export default function ChatSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4987 21.0834C17.7914 21.0834 22.082 16.7928 22.082 11.5001C22.082 6.20735 17.7914 1.91675 12.4987 1.91675C7.20597 1.91675 2.91536 6.20735 2.91536 11.5001C2.91536 13.0331 3.27533 14.4821 3.91535 15.767C4.08543 16.1085 4.14204 16.4988 4.04344 16.8673L3.47264 19.0006C3.22486 19.9267 4.07209 20.7739 4.99816 20.5261L7.13144 19.9553C7.49997 19.8567 7.89027 19.9134 8.23175 20.0834C9.51671 20.7235 10.9657 21.0834 12.4987 21.0834Z" stroke={props.color} stroke-width="1.5" />
      <path d="M8.66797 10.0625H16.3346" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M8.66797 13.4167H13.9388" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
    </svg>
  )
}


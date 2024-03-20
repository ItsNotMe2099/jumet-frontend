interface Props {
  className?: string
  color?: string
}

export default function FBSvg(props: Props) {
  return (
    <svg className={props.className} width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26.7629" cy="26.8513" r="25.9875" fill={props.color} />
      <path d="M31.7523 22.6882H28.2095V20.3646C28.2095 19.492 28.7879 19.2885 29.1952 19.2885C29.6016 19.2885 31.6953 19.2885 31.6953 19.2885V15.4524L28.2522 15.439C24.4299 15.439 23.5601 18.3001 23.5601 20.131V22.6882H21.3496V26.6411H23.5601C23.5601 31.7141 23.5601 37.8265 23.5601 37.8265H28.2095C28.2095 37.8265 28.2095 31.6538 28.2095 26.6411H31.3468L31.7523 22.6882Z" fill="#151B29" />
    </svg>
  )
}


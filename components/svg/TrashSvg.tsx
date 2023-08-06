interface Props {
  className?: string
  color: string
}

export default function TrashSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5001 6H3.5" stroke={props.color}  strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18.8346 8.5L18.3747 15.3991C18.1977 18.054 18.1092 19.3815 17.2442 20.1907C16.3792 21 15.0488 21 12.388 21H11.6146C8.95382 21 7.62342 21 6.75841 20.1907C5.8934 19.3815 5.8049 18.054 5.62791 15.3991L5.16797 8.5" stroke={props.color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.17188 4C9.58371 2.83481 10.695 2 12.0012 2C13.3074 2 14.4186 2.83481 14.8305 4" stroke={props.color}  strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}


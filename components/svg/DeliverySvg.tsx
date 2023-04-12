interface Props {
  className?: string
  color: string
}

export default function DeliverySvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1884_31040)">
        <path d="M8.55469 19C9.65926 19 10.5547 18.1046 10.5547 17C10.5547 15.8954 9.65926 15 8.55469 15C7.45012 15 6.55469 15.8954 6.55469 17C6.55469 18.1046 7.45012 19 8.55469 19Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.5547 19C19.6593 19 20.5547 18.1046 20.5547 17C20.5547 15.8954 19.6593 15 18.5547 15C17.4501 15 16.5547 15.8954 16.5547 17C16.5547 18.1046 17.4501 19 18.5547 19Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.55815 17H3.98045M7.41439 5L13.5581 5C14.1104 5 14.5581 5.44772 14.5581 6V10C14.5581 10.5523 15.0059 11 15.5581 11H22.5581M10.5581 17H16.5581M20.5581 17H21.5581C22.1104 17 22.5581 16.5523 22.5581 16V11M22.5581 11L20.1408 6.97101C19.7793 6.3686 19.1283 6 18.4258 6H14.5581" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4.24138 8.46094H7.42187M1.46094 12.375H6.61932" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1884_31040">
          <rect width="24" height="24" fill={props.color} />
        </clipPath>
      </defs>
    </svg>
  )
}


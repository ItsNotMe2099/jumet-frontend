interface Props {
  className?: string
  color: string
}

export default function UsersSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke={props.color} stroke-width="1.5" />
      <path d="M18 10C19.6569 10 21 8.88071 21 7.5C21 6.11929 19.6569 5 18 5" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M6 10C4.34315 10 3 8.88071 3 7.5C3 6.11929 4.34315 5 6 5" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M17.1973 16C17.7078 16.5883 18 17.2714 18 18C18 20.2091 15.3137 22 12 22C8.68629 22 6 20.2091 6 18C6 15.7909 8.68629 14 12 14C12.3407 14 12.6748 14.0189 13 14.0553" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M20 20C21.7542 19.6153 23 18.6411 23 17.5C23 16.3589 21.7542 15.3847 20 15" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
      <path d="M4 20C2.24575 19.6153 1 18.6411 1 17.5C1 16.3589 2.24575 15.3847 4 15" stroke={props.color} stroke-width="1.5" stroke-linecap="round" />
    </svg>
  )
}


interface Props {
  color?: string
  className?: string
}

export default function GiftSvg(props: Props) {
  return (
  <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10.5C2 9.67157 2.67157 9 3.5 9H19.5C20.3284 9 21 9.67157 21 10.5V10.5C21 11.3284 20.3284 12 19.5 12H3.5C2.67157 12 2 11.3284 2 10.5V10.5Z" stroke={props.color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 12V19.2C4 19.48 4 19.62 4.0545 19.727C4.10243 19.8211 4.17892 19.8976 4.273 19.9455C4.37996 20 4.51997 20 4.8 20H18.2C18.48 20 18.62 20 18.727 19.9455C18.8211 19.8976 18.8976 19.8211 18.9455 19.727C19 19.62 19 19.48 19 19.2V12" stroke={props.color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 6.5V9H9C7.34315 9 6 7.65685 6 6C6 4.34315 7.34315 3 9 3H9.5C11.433 3 13 4.567 13 6.5Z" stroke={props.color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 6.5V9H15.5C16.8807 9 18 7.88071 18 6.5C18 5.11929 16.8807 4 15.5 4C14.1193 4 13 5.11929 13 6.5Z" stroke={props.color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 12V20" stroke={props.color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>

)
}


import { colors } from '@/styles/variables'

interface Props {
  className?: string
  step: number
  index: number
}

export default function ColSvg(props: Props) {

  return (
    <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill={props.step === props.index ? colors.blue500 : colors.grey400} />
      <path fillRule="evenodd" clipRule="evenodd" d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
        fill={props.step === props.index ? colors.white : colors.white} />
    </svg>
  )
}


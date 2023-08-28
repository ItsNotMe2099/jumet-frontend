import styles from './index.module.scss'
import { SpinnerCircular } from 'spinners-react'
import { colors } from 'styles/variables'
import classNames from 'classnames'

interface Props {
  size: number
  color?: string
  secondaryColor?: string
  center?: boolean
  thickness?: number
}

export default function Spinner(props: Props) {
  return (
    <div className={classNames({
      [styles.root]: true,
      [styles.center]: typeof props.center === 'undefined' ? true : props.center,
    })}>
      <SpinnerCircular
        size={props.size}
        color={props.color ?? colors.blue500}
        secondaryColor={props.secondaryColor ?? colors.lightBlue}
        thickness={props.thickness ?? 150}
      />
    </div>
  )
}


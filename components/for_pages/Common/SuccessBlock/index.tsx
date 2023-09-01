import CheckSvg from '@/components/svg/CheckSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { ReactElement } from 'react'


interface Props {
  title?: string
  text?: React.ReactNode | string
  actions?: ReactElement | ReactElement[]
}

export default function SuccessBlock(props: Props) {

  return (
    <div className={styles.root}>
      <CheckSvg className={styles.check} color={colors.blue500} />
      {props.title && <div className={styles.title}>
        {props.title}
      </div>}
      {props.text && <div className={styles.text}>
        {props.text}
      </div>}
      {props.actions && <div className={styles.actions}>{props.actions}</div>}
    </div>
  )
}

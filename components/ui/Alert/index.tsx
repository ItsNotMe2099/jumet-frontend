import AlertSvg from '@/components/svg/AlertSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'


export type AlertType = 'attention' | 'danger' | 'success'
interface Props {
  title?: string
  text?: string
  type: AlertType
  className?: string
}

export default function Alert(props: Props) {

  return (
    <div className={classNames(styles.root, styles[props.type], props.className)}>
      <AlertSvg color={colors.dark500} />
      <div className={styles.wrapper}>
        {props.title && <div className={styles.title}>
          {props.title}
        </div>}
        {props.text && <div className={styles.text}>
          {props.text}
        </div>}
      </div>
    </div>
  )
}

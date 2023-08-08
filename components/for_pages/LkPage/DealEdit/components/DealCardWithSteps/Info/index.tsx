import AlertSvg from '@/components/svg/AlertSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'



interface Props {
  negative?: boolean
  textTop: string
  textBottom: string
  className?: string
}

export default function Info(props: Props) {

  return (
    <div className={classNames(styles.root, props.className, { [styles.negative]: props.negative })}>
      <AlertSvg color={colors.dark500} />
      <div className={styles.text}>
        <div className={styles.top}>
          {props.textTop}
        </div>
        <div className={styles.bottom}>
          {props.textBottom}
        </div>
      </div>
    </div>
  )
}

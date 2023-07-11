import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  additionalEl?: React.ReactNode
  title: string
  topClassName?: string
  className?: string
  contentClassName?: string
}

export default function CardLayout(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={classNames(styles.top, props.topClassName)}>
        <div className={styles.title}>
          {props.title}
        </div>
        {props.additionalEl && <div className={classNames(styles.additional, props.contentClassName)}>{props.additionalEl}</div>}
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}
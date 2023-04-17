import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  text: string
  active?: boolean
}

export default function Badge(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.active]: props.active})}>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}

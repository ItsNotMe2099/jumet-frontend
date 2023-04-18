import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  text: string
  active?: boolean
  onClick?: () => void
}

export default function Tab(props: Props) {
  return (
    <div onClick={props.onClick} className={classNames(styles.root, {[styles.active]: props.active})}>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}

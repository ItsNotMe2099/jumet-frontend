import styles from './index.module.scss'
import classNames from 'classnames'
export type TabStyleType = 'default' | 'outlined' | 'filter'

interface Props {
  text: string
  styleType: TabStyleType
  active?: boolean
  onClick?: () => void
  className?: string
}

export default function Tab(props: Props) {
  return (
    <div onClick={props.onClick} className={classNames(styles.root, props.className, {[styles.active]: props.active, [styles[props.styleType]]: true})}>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}

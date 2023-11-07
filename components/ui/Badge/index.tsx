import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  text: string
  active?: boolean
  className?: string
}

export default function Badge(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.active]: props.active}, props.className)}>
      {props.text}
    </div>
  )
}

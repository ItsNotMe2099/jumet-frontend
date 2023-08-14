import styles from './index.module.scss'
import classNames from 'classnames'
export  type StatusBadgeColor = 'blue' | 'red' | 'green' | 'yellow' | 'redLight'
interface Props{
  label: string,
  color: StatusBadgeColor
}

export default function StatusBadgeRaw<T extends string>(props: Props) {
  return (
    <div className={classNames(styles.root, {...(props.color ? {[styles[props.color]]: true} : {})})}>
      {props.label ?? ''}
    </div>
  )
}

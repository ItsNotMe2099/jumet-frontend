import styles from './index.module.scss'
import classNames from 'classnames'
export  type StatusBadgeColor = 'blue' | 'red' | 'green' | 'yellow'
interface IData{
  label: string,
  color: StatusBadgeColor
}
interface Props<T extends string> {
  data: {[key in T]: IData}
  value: T
}

export default function StatusBadge<T extends string>(props: Props<T>) {
  return (
    <div className={classNames(styles.root, {...(props.data[props.value]?.color ? {[styles[props.data[props.value].color]]: true} : {})})}>
      {props.data[props.value]?.label ?? ''}
    </div>
  )
}

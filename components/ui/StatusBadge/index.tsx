import styles from './index.module.scss'
import classNames from 'classnames'

interface IData{
  label: string,
  color: 'blue' | 'red' | 'green'
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

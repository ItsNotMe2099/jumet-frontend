import styles from './index.module.scss'
import classNames from 'classnames'
import {ISwitchFilterItem} from '@/types/types'

interface Props<T> {
  className?: string
  active?: T
  onClick?: (item: T) => void
  items?: ISwitchFilterItem<T>[]
}

export default function SwitchFilter<T>(props: Props<T>) {

  return (
      <div className={classNames(styles.root, props.className)}>
        {props.items?.map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.value === props.active})} key={index} onClick={() => props.onClick && props.onClick(item.value)}>
              {item.icon}
              <div className={styles.label}>{item.label}</div>
            </div>
        )}
      </div>
  )
}

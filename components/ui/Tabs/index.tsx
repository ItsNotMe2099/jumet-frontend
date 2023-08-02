import React from 'react'
import { IOption} from '@/types/types'
import styles from './index.module.scss'
import Tab from '@/components/ui/Tab'
import classNames from 'classnames'


interface Props<T> {
  options: IOption<T>[]
  fluid?: boolean
  tabClassName?: string
  onClick?: (value: T) => void
  value: T | T[]
  isMulti?: boolean
}

function Tabs<T>(props: Props<T>){
  return (
    <div className={classNames(styles.root, {[styles.fluid]: props.fluid})}>
      {props.options.map( i => <Tab
        className={styles.tab}
        active={props.isMulti ? (props.value as T[])?.includes(i.value!) : i.value === props.value}
        text={`${i.label}`}
        key={`${i.value}`}
        onClick={() => props.onClick?.(i.value!)}/>
      )}
      </div>
  )
}

export default Tabs

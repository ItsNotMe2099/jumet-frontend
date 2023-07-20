import React from 'react'
import { useField } from 'formik'
import {IField, IOption} from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Tab from '@/components/ui/Tab'


interface Props<T> extends IField<T> {
  options: IOption<T>[]
  placeholder?: string
  className?: string
}

function TabsField<T>(props: Props<T>){

  const [field, meta, helpers] = useField(props.name)

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption)
  }

  const getValue = () => {
    if (props.options) {
      return props.options.find((option) => option === field.value)
    } else {
      return ''
    }
  }

  return (
    <div className={classNames(styles.root, props.className)}>
     <div className={styles.label}>{props.label}</div>
      <div className={styles.tabs}>
      {props.options.map( i => <Tab
        className={styles.tab}
        active={i.value === field.value}
        text={`${i.value} км`}
        key={i.value}
        onClick={() => helpers.setValue(i.value) }/>
      )}
      </div>
    </div>
  )
}

export default TabsField

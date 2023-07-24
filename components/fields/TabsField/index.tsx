import React from 'react'
import { useField } from 'formik'
import {IField, IOption} from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Tab from '@/components/ui/Tab'
import FieldError from '@/components/fields/FieldError'


interface Props<T> extends IField<T> {
  options: IOption<T>[]
  placeholder?: string
  className?: string
  fluid?: boolean
  onChange?: (val: T) => void
}

function TabsField<T>(props: Props<T>){

  const [field, meta, helpers] = useField(props.name)

  const handleChange = (value: T) => {
    props.onChange?.(value)
    helpers.setValue(value)
  }

  return (
    <div className={classNames(styles.root,{[styles.fluid]: props.fluid}, props.className)}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.tabs}>
      {props.options.map( i => <Tab
        className={styles.tab}
        active={i.value === field.value}
        text={`${i.label}`}
        key={i.value}
        onClick={() => handleChange(i.value)}/>
      )}
      </div>
      <FieldError showError={meta.touched && !!meta.error}>{meta.error}</FieldError>
    </div>
  )
}

export default TabsField

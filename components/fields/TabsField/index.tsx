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
}

function TabsField<T>(props: Props<T>){

  const [field, meta, helpers] = useField(props.name)



  return (
    <div className={classNames(styles.root, props.className)}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.tabs}>
      {props.options.map( i => <Tab
        className={styles.tab}
        active={i.value === field.value}
        text={`${i.label}`}
        key={i.value}
        onClick={() => helpers.setValue(i.value) }/>
      )}
      </div>
      <FieldError showError={meta.touched && !!meta.error}>{meta.error}</FieldError>
    </div>
  )
}

export default TabsField

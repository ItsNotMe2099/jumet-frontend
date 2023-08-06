import React from 'react'
import { useField } from 'formik'
import {IField, IOption} from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import FieldError from '@/components/fields/FieldError'
import Tabs from '@/components/ui/Tabs'
import {TabStyleType} from '@/components/ui/Tab'


interface Props<T> extends IField<T> {
  options: IOption<T>[]
  placeholder?: string
  className?: string
  fluid?: boolean
  onChange?: (val: T) => void
  styleType?: TabStyleType
}

function TabsMultiField<T>(props: Props<T>){

  const [field, meta, helpers] = useField(props.name)

  const handleChange = (value: T) => {
    props.onChange?.(value)
    if(field.value.includes(value)){
      helpers.setValue(field.value.filter((i: T) => i !== value))
    }else{
      helpers.setValue([...field.value, value])
    }
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <Tabs options={props.options} value={field.value} isMulti={true} styleType={props.styleType} onClick={handleChange} fluid={props.fluid ?? false}/>
      <FieldError showError={meta.touched && !!meta.error}>{meta.error}</FieldError>
    </div>
  )
}

export default TabsMultiField

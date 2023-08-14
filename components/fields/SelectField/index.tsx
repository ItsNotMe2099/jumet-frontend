import React from 'react'
import { useField } from 'formik'
import {IField, IOption, Nullable} from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Select from '@/components/fields/Select'
import FieldError from '@/components/fields/FieldError'



interface Props<T> extends IField<T> {
  options: IOption<T>[]
  placeholder?: string
  className?: string
  errorClassName?: string
  noOptionsMessage?: Nullable<string>
}

export default function SelectField<T>(props: Props<T>) {

  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
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
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      {/*<div className={classNames({
        [styles.label]: true,
      })}>
        {props.label}
    </div>*/}
      <Select<T>
        label={props.label as string}
        options={props.options}
        value={field.value}
        hasError={showError}
        noOptionsMessage={props.noOptionsMessage}
        placeholder={props.placeholder ?? props.label as string ?? ''}
        onChange={(value) => {
          helpers.setValue(value)
        }}
      />
      <FieldError className={props.errorClassName} showError={showError}>{meta.error}</FieldError>
    </div>
  )
}


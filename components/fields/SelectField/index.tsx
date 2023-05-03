import React from 'react'
import Select from 'react-select'
import { useField } from 'formik'
import { IField } from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'

interface IOption {
  value: string
  label: string
}

interface Props extends IField<string> {
  options: IOption[]
  placeholder?: string
  className?: string
}

const SelectField = (props: Props) => {

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
      <label>{props.label}</label>
      <Select
        {...field}
        {...props}
        className={classNames({
          [styles.input]: true
        })}
        classNamePrefix='ma-select'
        value={getValue()}
        onChange={handleChange}
        options={props.options}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default SelectField

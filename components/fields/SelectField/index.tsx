import React from 'react'
import { useField } from 'formik'
import {IField, IOption, Nullable} from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Select, {SelectAsync} from '@/components/fields/Select'
import FieldError from '@/components/fields/FieldError'
import {Props as SelectProps} from 'react-select/dist/declarations/src'



export interface SelectFieldProps<T> extends IField<T> {
  options: IOption<T>[]
  onChange: (value: T) => void
  placeholder?: string
  className?: string
  errorClassName?: string
  noOptionsMessage?: Nullable<string>
  selectProps?: Nullable<SelectProps>,
  async?: boolean
  loadOptions?: (search: string, loadedOptions: IOption<T>[], data: any) => Promise<{options: IOption<T>[], hasMore: boolean, additional?: any | null}>
  initialAsyncData: any
}

export default function SelectField<T>(props: SelectFieldProps<T>) {

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
      {props.async ? <SelectAsync<T>
        label={props.label as string}
        options={props.options}
        //value={field.value}
        hasError={showError}
        noOptionsMessage={props.noOptionsMessage}
        placeholder={props.placeholder ?? props.label as string ?? ''}
        selectProps={props.selectProps}
        onChange={(value) => {
          console.log('OnChange11', value)
          helpers.setValue(value)
          props.onChange?.(value)
        }}
        loadOptions={props.loadOptions!}
        initialAsyncData={props.initialAsyncData}
      /> : <Select<T>
        label={props.label as string}
        options={props.options}
        value={field.value}
        hasError={showError}
        noOptionsMessage={props.noOptionsMessage}
        placeholder={props.placeholder ?? props.label as string ?? ''}
        selectProps={props.selectProps}
        onChange={(value) => {
          helpers.setValue(value)
          props.onChange?.(value)
        }}
      />}
      <FieldError className={props.errorClassName} showError={showError}>{meta.error?.toString()}</FieldError>
    </div>
  )
}


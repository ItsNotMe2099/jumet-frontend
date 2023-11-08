import React, {useState} from 'react'
import { useField } from 'formik'
import { IField, IOption, Nullable } from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import FieldError from '@/components/fields/FieldError'
import { Props as SelectProps } from 'react-select/dist/declarations/src'
import SelectMultiple from '@/components/fields/SelectMultiplie'
import Select from '@/components/fields/Select'


export interface SelectMultipleFieldProps<T> extends IField<T[]> {
  options: IOption<T>[]
  values: IOption<T>[]
  onChange?: (value: Nullable<T>) => void
  placeholder?: string
  className?: string
  errorClassName?: string
  noOptionsMessage?: Nullable<string>
  selectProps?: Nullable<SelectProps> | undefined,
  async?: boolean
  creatable?: boolean
  loadOptions?: (search: string, loadedOptions: IOption<T>[], data: any) => Promise<{ options: IOption<T>[], hasMore: boolean, additional?: any | null }>
  initialAsyncData?: any
  resettable?: boolean
  menuPosition?: 'fixed' | 'absolute'
  onCreateOption: (inputValue: string) => Promise<T>
}
// @ts-ignore
export default function SelectMultipleField<T extends WithId>(props: SelectMultipleFieldProps<T>) {

  const [field, meta, helpers] = useField<T[]>(props as any)
  const [selectKey, setSelectKey] = useState<string>('')
  const showError = meta.touched && !!meta.error
  const [isAddingLoading, setIsAddingLoading] = useState(false)


  const handleOnSelect = (value: T) => {
    if(!field.value?.find(i => i === value)) {
      helpers.setValue([...(field.value ?? []), value])
    }
    setSelectKey(`${Math.random()}`)
  }

  const handleDelete = (option: IOption<T>) => {
    console.log('handleDelete', option.value)
    helpers.setValue(field.value.filter(i => i !== option.value))
  }
  // Generate a unique key based on Formik field name and value
  const uniqueKey = selectKey

  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      <SelectMultiple<T> values={props.values} onDelete={handleDelete} select={ <Select<T[]>
        label={props.label as string}
        key={uniqueKey} // Add a unique key to trigger re-render
        options={props.options}
        value={[]}
        isLoading={isAddingLoading}
        hasError={showError}
        initialAsyncData={props.initialAsyncData}
        menuPosition={!props.menuPosition ? 'fixed' : props.menuPosition}
        // @ts-ignore
        loadOptions={props.loadOptions}
        noOptionsMessage={props.noOptionsMessage}
        resettable={props.resettable ?? false}
        placeholder={props.placeholder ?? ''}
        selectProps={props.selectProps}
        // @ts-ignore
        onChange={handleOnSelect}
      />}/>
      <FieldError className={props.errorClassName} showError={showError}>{meta.error?.toString()}</FieldError>
    </div>
  )
}


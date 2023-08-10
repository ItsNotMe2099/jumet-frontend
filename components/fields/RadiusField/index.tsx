import React, {useState} from 'react'
import { useField} from 'formik'
import {IField, IOption} from '@/types/types'
import styles from './index.module.scss'
import classNames from 'classnames'
import FieldError from '@/components/fields/FieldError'
import TabsField from '@/components/fields/TabsField'
import InputField from '@/components/fields/InputField'
interface IFormData {
  radius?: number | null,
  radiusCustom?: number | null
}


interface Props<T> extends IField<T> {
  options?: IOption<T>[]
  placeholder?: string
  className?: string  | null
  errorClassName?: string  | null
}

export default function RadiusField<T>(props: Props<T>) {

  const [field, meta, helpers] = useField(props.name)
  const showError = meta.touched && !!meta.error
  const[ lastInput, setLastInput ] = useState<'tabs' | 'custom'>('tabs')
   const options: IOption<number>[] = [
    { label: '5 км', value: 5 },
    { label: '10 км', value: 10 },
    { label: '20 км', value: 20 },
    { label: '50 км', value: 50 },
  ]


  const handleChangeTab = (radius: number | null) => {
    setLastInput('tabs')

    if(field.value === radius){
      setTimeout(() => {
        helpers.setValue(null)
      }, 100)

    }else {
      helpers.setValue(radius)
    }
  }

  const handleChangeCustom = (radius: number | null) => {
    setLastInput('custom')
    helpers.setValue(radius)
  }


  return (
      <div className={classNames(styles.root, props.className)}>
      <TabsField<number> label={props.label}  options={options} name={props.name} onChange={handleChangeTab}/>
      <InputField
        suffix={'км'}
        resettable={true}
        placeholder='Свой радиус поиска'
        format={'number'}
        parseValue={(value) => lastInput === 'custom' ? value : !options.find((i) => i.value === field.value) ? value : ''}
        name={props.name}
        onChange={(val) => handleChangeCustom(val as number | null)}/>
      <FieldError className={props.errorClassName} showError={showError}>{meta.error}</FieldError>
      </div>
  )
}


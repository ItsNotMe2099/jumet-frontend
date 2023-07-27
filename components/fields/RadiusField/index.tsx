import React from 'react'
import {Form, FormikProvider, useField, useFormik} from 'formik'
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
  className?: string
  errorClassName?: string
}

export default function RadiusField<T>(props: Props<T>) {

  const [field, meta, helpers] = useField(props.name)
  const showError = meta.touched && !!meta.error
  const options: IOption<number>[] = [
    { label: '5 км', value: 5 },
    { label: '10 км', value: 10 },
    { label: '20 км', value: 20 },
    { label: '50км', value: 50 },
  ]

  const initialValues: IFormData = {
    radius: options.find(i => i.value === field.value)?.value ?? null,
    radiusCustom: !options.find(i => i.value === field.value) ? field.value : null,
  }
  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: () => {

    }
  })

  const handleChangeTab = (radius: number) => {
    helpers.setValue(radius)
    formik.setFieldValue('radiusCustom', '')
  }

  const handleChangeCustom = (radius: string) => {
    helpers.setValue(parseInt(radius, 10))
    formik.setFieldValue('radius', null)
  }


  return (
    <FormikProvider value={formik}>
      <Form className={classNames(styles.root, props.className)}>
      <TabsField<number> label={props.label}  options={options} name={'radius'} onChange={handleChangeTab}/>
      <InputField
        suffix={'км'}
        placeholder='Свой радиус поиска'
        type={'number'}
        name={'radiusCustom'}
        onChange={handleChangeCustom}/>
      <FieldError className={props.errorClassName} showError={showError}>{meta.error}</FieldError>
      </Form>
    </FormikProvider>
  )
}


import styles from './index.module.scss'
import React, {KeyboardEventHandler} from 'react'
import InputField from '@/components/fields/InputField'
import {Form, FormikProvider, useFormik} from 'formik'
import {Nullable} from '@/types/types'

interface Props {
  onChange: (value: string) => void
}

export default function ChatDialogSearch(props: Props) {
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      //    formik.submitForm()
    }
  }
  const handleChange = (value: Nullable<string>) => {
    props.onChange(value)
  }
  const handleSubmit = () => {

  }
  const initialValues = {}
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <InputField name={'text'} placeholder={'Поиск'} prefix={'search'} onChange={handleChange}/>
      </Form>
    </FormikProvider>
  )

}

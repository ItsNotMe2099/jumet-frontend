import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { useAppContext } from '@/context/state'
import { useState } from 'react'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'


interface Props {

}

export default function ProfileBuyerForm(props: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    companyName: appContext.aboutMe?.companyName,
    email: appContext.aboutMe?.email,
    password: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField
          className={styles.field}
          name='companyName'
          label='Название компании / группы компаний'
          validate={Validator.required} />
        <InputField
          className={styles.field}
          name='email'
          label='Email'
          validate={Validator.combine([Validator.required, Validator.email])} />
        <InputField
          className={styles.field}
          name='password'
          label='Пароль'
          obscure={true}
          validate={Validator.required} />
        <Button disabled={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
  )
}

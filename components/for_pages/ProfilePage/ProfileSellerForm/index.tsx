import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { useAppContext } from '@/context/state'
import PhoneField from '@/components/fields/PhoneField'
import { InputStyleType } from '@/types/enums'
import { useState } from 'react'
import TextField from '@/components/fields/TextField'
import Button from '@/components/ui/Button'


interface Props {

}

export default function ProfileSellerForm(props: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    phone: appContext.aboutMe?.phone,
    name: appContext.aboutMe?.name,
    password: appContext.aboutMe?.password
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <PhoneField
          className={styles.field}
          name='phone'
          styleType={InputStyleType.Default}
          label='Телефон'
          disabled={loading}
          validate={Validator.combine([Validator.required, Validator.phone])}
        />
        <TextField
          className={styles.field}
          name='name'
          label='Ваше имя'
          validate={Validator.required} />
        <TextField
          className={styles.field}
          inputStyle={InputStyleType.Password}
          name='password'
          label='Пароль'
          validate={Validator.required} />
        <Button disabled={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
  )
}

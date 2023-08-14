import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { SnackbarType } from '@/types/enums'
import Already from '@/components/for_pages/Common/Already'
import { useAuthContext } from '@/context/auth_state'
import { Routes } from '@/types/routes'
import AuthRepository from '@/data/repositories/AuthRepository'
import { RequestError } from '@/types/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAppContext } from '@/context/state'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface Props {
  onComplete: (data?: { email: string }) => void
}

export default function BuyerRegForm(props: Props) {
  const appContext = useAppContext()
  const authContext = useAuthContext()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data: { companyName: string, email: string, password: string }) => {
    setLoading(true)
    try {
      const res = await AuthRepository.buyerRegister(data)
      props.onComplete({ email: data.email })
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }

    setLoading(false)
  }

  const initialValues = {
    companyName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <InputField name='companyName' label='Название компании / группы компаний' validate={Validator.required} />
        <InputField name='email' label='Email' validate={Validator.combine([Validator.required, Validator.email])} />
        <InputField name='password' label='Пароль' validate={Validator.required} />
        <InputField
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])} />
        <Button type='submit' className={styles.btn} spinner={loading} styleType='large' color='blue'>
          Зарегистрироваться
        </Button>
        <Already
          topText='Уже есть аккаунт на Jumet?'
          btnText='Войти'
          link={Routes.login()} />
      </Form>
    </FormikProvider>
  )
}

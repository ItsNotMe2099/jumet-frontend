import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import {Goal, LoginType, SnackbarType} from '@/types/enums'
import Link from 'next/link'
import Already from '../../Common/Already'
import PhoneField from '@/components/fields/PhoneField'
import { useAuthContext } from '@/context/auth_state'
import { useState } from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import {SITE_NAME} from '@/types/constants'
import Analytics from '@/utils/goals'


interface Props {
  mode: LoginType
}

export default function LoginForm(props: Props) {

  const authContext = useAuthContext()
  const appContext = useAppContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: { phone: string, email: string, password: string }) => {
    setLoading(true)
    let accessToken: string = ''
    try {
      accessToken = await AuthRepository.login(props.mode === LoginType.Seller ? data.phone : data.email, data.password)
      if (accessToken) {
        appContext.setToken(accessToken)
        appContext.updateAboutMe()
        Analytics.goal(Goal.AuthReg, {role: props.mode})
        if (redirect) {
          router.replace(redirect)
        } else {
          router.replace(Routes.index)
        }
      } else {
        appContext.showSnackbar('Token error', SnackbarType.error)
      }
    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }

  const initialValues = {
    phone: '+79',
    email: '',
    password: '',
    checkbox: false
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })




  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {props.mode === LoginType.Seller && <PhoneField
          label={'Телефон'}
          name={'phone'}
          validate={Validator.phone}
        />}
        {props.mode === LoginType.Buyer && <InputField name='email' label='Email' validate={Validator.combine([Validator.required, Validator.email])} />}
        <InputField
          type='password'
          name='password'
          label='Пароль'
          validate={Validator.required} />
        <div className={styles.checkbox}>
          <Link href={Routes.passwordForgot(props.mode)} className={styles.forget}>
            Забыли пароль?
          </Link>
        </div>
        <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Войти
        </Button>
        <Already
          btnClassName={styles.alreadyBtn}
          topText={`Нет аккаунта на ${SITE_NAME}?`}
          btnText='Зарегистрироваться'
          link={Routes.registration}
        />
      </Form>
    </FormikProvider>
  )
}

import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType, LoginType, SnackbarType} from '@/types/enums'
import CheckBoxField from '@/components/fields/CheckBoxField'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import Already from '../../Common/Already'
import PhoneField from '@/components/fields/PhoneField'
import { useAuthContext } from '@/context/auth_state'
import { useState} from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import {RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'


interface Props {
  mode: LoginType
}

export default function LoginForm(props: Props) {

  const authContext = useAuthContext()
  const appContext = useAppContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: {phone: string, email: string, password: string}) => {
    setLoading(true)
    let accessToken: string = ''
    try {
      accessToken = await AuthRepository.login(props.mode === LoginType.Seller? data.phone : data.email, data.password)
      if (accessToken) {
        appContext.setToken(accessToken)
        appContext.updateAboutMe()
        if(redirect){
          router.replace(redirect)
        }else{
          router.replace(Routes.index)
        }
      }else{
        appContext.showSnackbar('Token error', SnackbarType.error)
      }
    } catch (err) {
      console.log('ErrIs', err instanceof RequestError)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }

  const initialValues = {
    phone: '',
    email: '',
    password: '',
    checkbox: false
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)


  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {props.mode === LoginType.Seller && <PhoneField
          label={'Телефон'}
          name={'phone'}
          validate={Validator.phone}
          styleType={InputStyleType.Default}
        />}
        {props.mode === LoginType.Buyer && <TextField name='email' label='Email' validate={Validator.combine([Validator.required, Validator.email])} />}
        <TextField
          type='password'
          name='password'
          label='Пароль'
          validate={Validator.required}
          inputStyle={InputStyleType.Password} />
        <div className={styles.checkbox}>
          <CheckBoxField name='checkbox' color={colors.yellow500} label='Запомнить пароль' />
          <Link href={Routes.passwordForgot} className={styles.forget}>
            Забыли пароль?
          </Link>
        </div>
        <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Войти
        </Button>
        <Already
          btnClassName={styles.alreadyBtn}
          topText='Нет аккаунта на Jumet?'
          btnText='Зарегистрироваться'
          link={Routes.registration}
        />
      </Form>
    </FormikProvider>
  )
}

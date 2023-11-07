import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { SnackbarType } from '@/types/enums'
import { useState } from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import { RequestError } from '@/types/types'
import { useAppContext } from '@/context/state'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'

interface IFormData{
  email: string,
  password: string,
  passwordConfirm: string
}
interface Props {

}

export default function InviteReceivingPointConfirmForm(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)

    try {
      const res = await AuthRepository.confirmInviteToReceivingPoint({
        newPassword: data.password,
        login: data.email,
        code: router.query.code as string
      })
      if (res.accessToken) {
        appContext.setToken(res.accessToken)
        appContext.updateAboutMe()
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

  const initialValues:IFormData = {
    email: router.query.email as string,
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
        <InputField
          name='email'
          label='Email'
          disabled={true}
          validate={Validator.combine([Validator.required])}/>
        <InputField
          obscure={true}
          type='password'
          name='password'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required])}/>
        <InputField
          obscure={true}
          type='password'
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])}/>

        <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Зарегистрироваться
        </Button>

      </Form>
    </FormikProvider>
  )
}

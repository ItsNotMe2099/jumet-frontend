import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import {InputStyleType, SnackbarType} from '@/types/enums'
import TextField from '@/components/fields/TextField'
import { useAuthContext } from '@/context/auth_state'
import AuthRepository from '@/data/repositories/AuthRepository'
import {RequestError} from '@/types/types'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {useAppContext} from '@/context/state'
import {Routes} from '@/types/routes'

interface FormData{
  name: string,
  password: string,
  passwordConfirm: string
}
interface Props {

}

export default function FinishForm(props: Props) {
  const appContext = useAppContext()
  const authContext = useAuthContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await AuthRepository.sellerCompleteRegistration(data)

      if(res.accessToken){
        appContext.setToken(res.accessToken)
        }
        if(redirect){
          router.replace(redirect)
        }else{
          router.replace(Routes.index)
        }

    } catch (err) {
      console.log('ErrIs', err instanceof RequestError)
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues: FormData = {
    name: '',
    password: '',
    passwordConfirm: '',
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextField name='name' label='Ваше имя' validate={Validator.required} />
        <TextField inputStyle={InputStyleType.Password} name='password' label='Придумайте пароль' validate={Validator.required} />
        <TextField
          inputStyle={InputStyleType.Password}
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])} />
        <Button type='submit' className={styles.btn} styleType='large' color='blue' spinner={loading}>
          Зарегистрироваться
        </Button>
      </Form>
    </FormikProvider>
  )
}

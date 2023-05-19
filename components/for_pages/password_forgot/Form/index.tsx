import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import {InputStyleType, LoginType, SnackbarType} from '@/types/enums'
import PhoneField from '@/components/fields/PhoneField'
import {useAuthContext} from '@/context/auth_state'
import {useState} from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import {RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'


interface Props {
  mode: LoginType
}

export default function PasswordForgotForm(props: Props) {

  const authContext = useAuthContext()
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const handleSubmit = async (data: { phone: string, email: string }) => {
    setLoading(true)
    try {
      const login = props.mode === LoginType.Seller ? data.phone : data.email
      const res = await AuthRepository.passwordReset(login)

      router.push(Routes.passwordReset({login, code: res.code}))
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
    email: ''
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
        {props.mode === LoginType.Buyer && <TextField name='email' label='Email'
                                                      validate={Validator.combine([Validator.required, Validator.email])}/>}

        <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Восстановить
        </Button>
      </Form>
    </FormikProvider>
  )
}
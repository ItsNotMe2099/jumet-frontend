import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import {InputStyleType, SnackbarType} from '@/types/enums'
import {useAuthContext} from '@/context/auth_state'
import {useState} from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import {RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import OtpCodeField from '@/components/fields/OtpCodeField'
import useInterval from 'use-interval'
import FormError from '@/components/ui/FormError'
import OtpCodeSendAgain from '@/components/ui/OtpCodeSendAgain'

interface FormData {
  code: string
  password: string,
  passwordConfirm: string
}

interface Props {
  code: string
  login: string
}

export default function PasswordResetForm(props: Props) {
  const authContext = useAuthContext()
  const appContext = useAppContext()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string | null>(props.code ?? null)
  const [loadingSendAgain, setLoadingSendAgain] = useState(false)
  const [remainSec, setRemainSec] = useState<number>(0)

  useInterval(() => {
    if (remainSec > 0) {
      setRemainSec(remainSec - 1)
    }
  }, 1000)
  const handleSendAgain = async () => {
    setError(null)
    setLoadingSendAgain(true)
    try {
      const res = await AuthRepository.passwordReset(props.login)
      setRemainSec(res.codeCanRetryIn)
      setCode(res.code)

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoadingSendAgain(false)
  }
  const redirect = router.query.redirect as string

  const handleSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await AuthRepository.passwordSet({
        login: props.login,
        code: data.code,
        newPassword: data.password,
      })

      appContext.setToken(res.accessToken)
      appContext.updateAboutMe()
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace(Routes.index)
      }

    } catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }

    }


    setLoading(false)
  }

  const initialValues = {
    code: props.code ?? '',
    password: '',
    passwordConfirm: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)


  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.codeArea}>
        <OtpCodeField
          name='code'
          length={4}
          showError={!!error}
          disabled={loadingSendAgain || loading}
        />
        {code && <div className={styles.code}>{code}</div>}
        <OtpCodeSendAgain remainSec={remainSec} onSendAgainClick={handleSendAgain}/>
        </div>
          <TextField inputStyle={InputStyleType.Password} name='password' label='Новый пароль'
                   validate={Validator.required}/>
        <TextField
          inputStyle={InputStyleType.Password}
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])}/>
          <FormError error={error}/>
        <Button type='submit' className={styles.btn} styleType='large' color='blue' spinner={loading}>
          Изменить пароль
        </Button>
      </Form>
    </FormikProvider>
  )
}

import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useAppContext } from '@/context/state'
import { useAuthContext } from '@/context/auth_state'
import OtpCodeField from '@/components/fields/OtpCodeField'
import {useState} from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import {RequestError} from '@/types/types'
import useInterval from 'use-interval'
import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {SnackbarType} from '@/types/enums'
import OtpCodeSendAgain from '@/components/ui/OtpCodeSendAgain'


interface Props {
  code?: string
  login: string,
  codeCanRetryIn: number
  onConfirm: (res: IAuthResponse) => void,
  onSendAgain: () => Promise<ISendCodeResponse>
}

export default function OtpCodeForm(props: Props) {
  const [error, setError] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(props.code ?? null)
  const [loading, setLoading] = useState(false)
  const [loadingSendAgain, setLoadingSendAgain] = useState(false)
  const [remainSec, setRemainSec] = useState<number>(props.codeCanRetryIn)

  useInterval(() => {
    if (remainSec > 0) {
      setRemainSec(remainSec - 1)
    }
  }, 1000)
  const handleSendAgain = async () => {
    setError(null)
    setLoadingSendAgain(true)
    try {
      const res = await props.onSendAgain()
      setRemainSec(res.codeCanRetryIn)
      setCode(res.code)

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoadingSendAgain(false)
  }

  const handleSubmit = async (data: { code: string }) => {
    setError(null)
    setLoading(true)
    try {
      const res = await AuthRepository.sellerConfirmCode({...data, phone: props.login})
      await props.onConfirm(res)
    } catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }

    }
    setLoading(false)
  }

  const appContext = useAppContext()
  const authContext = useAuthContext()

  const initialValues = {
    code: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <OtpCodeField
          name='code'
          length={4}
          onComplete={() => formik.submitForm()}
          showError={!!error}
          disabled={loadingSendAgain || loading}
        />
        {code && <div className={styles.code}>{code}</div>}
       <OtpCodeSendAgain remainSec={remainSec} onSendAgainClick={handleSendAgain}/>
      </Form>
    </FormikProvider>
  )
}

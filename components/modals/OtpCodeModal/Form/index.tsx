import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useAppContext } from '@/context/state'
import { useAuthContext } from '@/context/auth_state'
import OtpCodeField from '@/components/fields/OtpCodeField'
import Timer from '@/components/for_pages/Common/Timer'


interface Props {

}

export default function OtpCodeForm(props: Props) {

  const handleSubmit = async (data: { phone: string, code: string }) => {
    await authContext.confirmCode(data.code)
  }

  const appContext = useAppContext()
  const authContext = useAuthContext()

  const initialValues = {
    phone: appContext.modalArguments,
    code: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  const handleSendCodeAgain = async () => {
    if (authContext.remainSec === 0) {
      await authContext.sendCodeAgain()
    }
  }

  console.log('formik.values MODAL', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <OtpCodeField
          name='code'
          length={4}
          onComplete={() => formik.submitForm()}
          snackbar={authContext.otpError?.show}
          disabled={authContext.confirmSpinner || authContext.againSpinner}
        />
        <div className={styles.code}>{authContext.codeRes?.code}</div>
        <div className={styles.bottom}>
          Код не пришел?<br /><span onClick={handleSendCodeAgain}>Запросить код повторно</span> через <Timer key={authContext.remainSec} seconds={authContext.remainSec} /> сек.
        </div>
      </Form>
    </FormikProvider>
  )
}

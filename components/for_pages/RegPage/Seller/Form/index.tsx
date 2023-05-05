import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType, ModalType } from '@/types/enums'
import PhoneField from '@/components/fields/PhoneField'
import Already from '@/components/for_pages/Common/Already'
import { LoginFormData } from '@/types/form_data/LoginFormData'
import { useAppContext } from '@/context/state'
import { useAuthContext } from '@/context/auth_state'


interface Props {

}

export default function SellerRegForm(props: Props) {

  const handleSubmit = async (data: { phone: string, code: string }) => {
    handleSendCode(data)
  }

  const initialValues = {
    phone: '',
    code: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const appContext = useAppContext()

  const authContext = useAuthContext()

  const handleSendCode = async (data: LoginFormData) => {
    await authContext.signUp(data)
    appContext.showModal(ModalType.OtpCode, data.phone)
  }

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <PhoneField
          name='phone'
          styleType={InputStyleType.Default}
          label='Телефон'
          disabled={authContext.signUpSpinner}
          validate={Validator.combine([Validator.required, Validator.phone])}
        />
        <Button disabled={authContext.signUpSpinner} type='submit' className={styles.btn} styleType='large' color='blue'>
          Зарегистрироваться
        </Button>
        <Already
          topText='Уже есть аккаунт на Jumet?'
          btnText='Войти'
          link='/login' />
      </Form>
    </FormikProvider>
  )
}

import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType } from '@/types/enums'


interface Props {
  onNextStep: (data?: any) => void
}

export default function Reg(props: Props) {

  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const initialValues = {
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextField name='email' label='Email' validate={Validator.combine([Validator.required, Validator.email])} />
        <TextField inputStyle={InputStyleType.Password} name='password' label='Пароль' validate={Validator.required} />
        <TextField
          inputStyle={InputStyleType.Password}
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])} />
        <Button type='submit' className={styles.btn} styleType='large' color='blue'>
          Зарегистрироваться
        </Button>
        <div className={styles.already}>
          <div className={styles.top}>
            Уже есть аккаунт на Jumet?
          </div>
          <Button className={styles.signIn} styleType='large' color='grey'>
            Войти
          </Button>
          <div className={styles.bottom}>
            При регистрации и входе вы соглашаетесь с политикой обработки персональных данных
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}

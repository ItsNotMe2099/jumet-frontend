import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType } from '@/types/enums'


interface Props {

}

export default function LoginForm(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    phone: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextField
          label={'Телефон'}
          name={'phone'}
          validate={Validator.phone}
          isNumbersOnly
        />
        <TextField
          type='password'
          name='password'
          label='Пароль'
          validate={Validator.required}
          inputStyle={InputStyleType.Password} />
        <Button type='submit' className={styles.btn} styleType='large' color='blue'>
          Войти
        </Button>
        <div className={styles.already}>
          <div className={styles.top}>
            Нет аккаунта на Jumet?
          </div>
          <Button href={'/registration'} className={styles.signIn} styleType='large' color='grey'>
            Зарегистрироваться
          </Button>
          <div className={styles.bottom}>
            При регистрации и входе вы соглашаетесь с политикой обработки персональных данных
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}

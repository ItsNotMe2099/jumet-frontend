import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType } from '@/types/enums'
import CheckBoxField from '@/components/fields/CheckBoxField'
import { colors } from '@/styles/variables'
import Link from 'next/link'


interface Props {

}

export default function LoginForm(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    phone: '',
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
        <div className={styles.checkbox}>
          <CheckBoxField name='checkbox' color={colors.yellow} label='Запомнить пароль' />
          <Link href={'#'} className={styles.forget}>
            Забыли пароль?
          </Link>
        </div>
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

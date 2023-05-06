import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType } from '@/types/enums'
import CheckBoxField from '@/components/fields/CheckBoxField'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import Already from '../../Common/Already'
import { SwitchState } from '@/data/enum/SwitchState'
import PhoneField from '@/components/fields/PhoneField'
import { useAuthContext } from '@/context/auth_state'
import { useEffect } from 'react'


interface Props {
  mode: SwitchState
}

export default function LoginForm(props: Props) {

  const authContext = useAuthContext()

  const handleSubmit = async (data: {login: string, password: string}) => {
    await authContext.login(data.login, data.password)
  }

  const initialValues = {
    login: '',
    password: '',
    checkbox: false
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  useEffect(() => {
    formik.setFieldValue('login', '')
  }, [props.mode])

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {props.mode === SwitchState.FirstOption ? <PhoneField
          label={'Телефон'}
          name={'login'}
          validate={Validator.phone}
          styleType={InputStyleType.Default}
        /> : <TextField name='login' label='Email' validate={Validator.combine([Validator.required, Validator.email])} />}
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
        <Button disabled={authContext.loginSpinner} type='submit' className={styles.btn} styleType='large' color='blue'>
          Войти
        </Button>
        <Already
          btnClassName={styles.alreadyBtn}
          topText='Нет аккаунта на Jumet?'
          btnText='Зарегистрироваться'
          link='/registration'
        />
      </Form>
    </FormikProvider>
  )
}

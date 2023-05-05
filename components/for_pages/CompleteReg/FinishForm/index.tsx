import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { InputStyleType } from '@/types/enums'
import TextField from '@/components/fields/TextField'
import { useAuthContext } from '@/context/auth_state'


interface Props {

}

export default function FinishForm(props: Props) {

  const authContext = useAuthContext()

  const handleSubmit = async (data: { name: string, password: string }) => {
    await authContext.completeRegistration(data.name, data.password)
  }

  const initialValues = {
    name: '',
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
        <TextField name='name' label='Ваше имя' validate={Validator.required} />
        <TextField inputStyle={InputStyleType.Password} name='password' label='Придумайте пароль' validate={Validator.required} />
        <TextField
          inputStyle={InputStyleType.Password}
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])} />
        <Button type='submit' className={styles.btn} styleType='large' color='blue' disabled={authContext.completeSpinner}>
          Задать пароль
        </Button>
      </Form>
    </FormikProvider>
  )
}

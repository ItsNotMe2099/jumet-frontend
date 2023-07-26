import styles from './index.module.scss'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import {useAppContext} from '@/context/state'
import {OtpCodeModalArguments} from '@/types/modal_arguments'
import {Form, FormikProvider, useFormik} from 'formik'
import TextField from '@/components/fields/TextField'
import {InputStyleType, SnackbarType} from '@/types/enums'
import Validator from '@/utils/validator'
import FormError from '@/components/ui/FormError'
import {useState} from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import {RequestError} from '@/types/types'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'
import Button from '@/components/ui/Button'
interface IFormData{
  passwordConfirm: string | null
  password: string | null
  oldPassword: string | null
}
interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const PasswordChangeModal = (props: Props) => {

  const header = 'Смена пароля'
    const appContext = useAppContext()
  const args = appContext.modalArguments as OtpCodeModalArguments
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IFormData) => {
    setError(null)
    setLoading(true)
    try {
      const res = await AuthRepository.passwordChange({oldPassword: data.oldPassword, newPassword: data.password})
      appContext.showSnackbar( 'Пароль успешно изменен', SnackbarType.success)
      appContext.hideModal()
    } catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }

    }
    setLoading(false)

  }



  const formik = useFormik<IFormData>({
    initialValues: {
      oldPassword: null,
      password: null,
      passwordConfirm: null
    },
    onSubmit: handleSubmit
  })
  const body = (
    <FormikProvider<IFormData> value={formik}>
      <Form className={styles.form}>
        <TextField
          inputStyle={InputStyleType.Password}
          type='password'
          name='oldPassword'
          label='Старый пароль'
          validate={Validator.combine([Validator.required])}/>
        <TextField
          inputStyle={InputStyleType.Password}
          type='password'
          name='password'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required])}/>
        <TextField
          inputStyle={InputStyleType.Password}
          type='password'
          name='passwordConfirm'
          label='Повторите пароль'
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])}/>
        <FormError error={error}/>

        <Button disabled={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Изменить
        </Button>
      </Form>
    </FormikProvider>
  )


    return (
      <ModalLayout className={styles.modalLayout}  >
        <ModalHeader title={'Смена пароля'}/>
        <ModalBody>{body}</ModalBody>
      </ModalLayout>
    )
}
export default PasswordChangeModal


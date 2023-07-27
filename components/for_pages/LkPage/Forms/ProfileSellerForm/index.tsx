import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {useAppContext} from '@/context/state'
import PhoneField from '@/components/fields/PhoneField'
import {InputStyleType, ModalType, SnackbarType} from '@/types/enums'
import {useState} from 'react'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import LinkButton from '@/components/ui/LinkButton'
import {omit} from '@/utils/omit'
import {RequestError} from '@/types/types'
import CurrentUserRepository from '@/data/repositories/CurrentUserRepository'


interface IFormData{
  phone: string;
  firstName: string;
  lastName: string;
  patronymic: string;

}
interface Props {

}

export default function ProfileSellerForm(props: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: IFormData) => {
    console.log('Submit', omit(data, ['phone']))
    setLoading(true)
    try {
      const res = await CurrentUserRepository.update(omit(data, ['phone']))
      appContext.showSnackbar('Изменения сохранены', SnackbarType.success)

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues = {
    phone: appContext.aboutMe?.phone,
    firstName: appContext.aboutMe?.firstName,
    lastName: appContext.aboutMe?.firstName,
    patronymic: appContext.aboutMe?.firstName,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <div className={styles.root}>
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <PhoneField
          name='phone'
          styleType={InputStyleType.Default}
          label='Телефон'
          disabled={true}
          validate={Validator.combine([Validator.required, Validator.phone])}
        />
        <InputField
          name='lastName'
          label='Ваша фамилия'
          validate={Validator.required} />
        <InputField
          name='firstName'
          label='Ваше имя'
          validate={Validator.required} />
        <InputField
          name='patronymic'
          label='Ваше отчество'
          validate={Validator.required} />
        <LinkButton className={styles.changePassword} onClick={()=> appContext.showModal(ModalType.PasswordChange)}>Изменить пароль</LinkButton>
        <Button disabled={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
    </div>
  )
}

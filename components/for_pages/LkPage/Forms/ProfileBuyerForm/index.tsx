import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { useAppContext } from '@/context/state'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import {AboutMeWrapper, useAboutMeContext} from '@/context/aboutme_state'
import IAboutMe from '@/data/interfaces/IAboutMe'
import {ModalType, SnackbarType} from '@/types/enums'
import LinkButton from '@/components/ui/LinkButton'
import {Nullable} from '@/types/types'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData{
  email: Nullable<string>
  companyName: Nullable<string>
  firstName: Nullable<string>
  lastName: Nullable<string>
  patronymic: Nullable<string>
}
interface Props {

}

const ProfileBuyerFormInner = (props: Props) => {
  const appContext = useAppContext()
  const aboutMeContext = useAboutMeContext()

  const handleSubmit = async (data: IFormData) => {
    await aboutMeContext.update(data as IAboutMe)
    appContext.showSnackbar('Изменения сохранены', SnackbarType.success)
  }

  const initialValues = {
    companyName: appContext.aboutMe?.companyName ?? null,
    email: appContext.aboutMe?.email ?? null,
    firstName: appContext.aboutMe?.firstName ?? null,
    lastName: appContext.aboutMe?.lastName ?? null,
    patronymic: appContext.aboutMe?.patronymic ?? null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <InputField
          name='companyName'
          label='Название компании / группы компаний'
          validate={Validator.required} />
        <InputField
          name='email'
          label='Email'
          disabled={true}
          validate={Validator.combine([Validator.required, Validator.email])} />
        <InputField
          name='lastName'
          label='Ваша фамилия'
          validate={Validator.required}/>
        <InputField
          name='firstName'
          label='Ваше имя'
          validate={Validator.required}/>
        <InputField
          name='patronymic'
          label='Ваше отчество'/>
        <LinkButton className={styles.changePassword} onClick={() => appContext.showModal(ModalType.PasswordChange)}>Изменить
          пароль</LinkButton>
        <Button disabled={aboutMeContext.editLoading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
  )
}


export default function ProfileBuyerForm(props: Props) {
  return <AboutMeWrapper>
    <ProfileBuyerFormInner/>
  </AboutMeWrapper>
}

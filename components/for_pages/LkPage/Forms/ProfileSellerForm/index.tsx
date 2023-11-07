import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {useAppContext} from '@/context/state'
import PhoneField from '@/components/fields/PhoneField'
import {ModalType, SnackbarType} from '@/types/enums'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import LinkButton from '@/components/ui/LinkButton'
import {AboutMeWrapper, useAboutMeContext} from '@/context/aboutme_state'
import IAboutMe from '@/data/interfaces/IAboutMe'
import {Nullable} from '@/types/types'
import FormErrorScroll from '@/components/ui/FormErrorScroll'


interface IFormData {
  phone: string | null;
  firstName: Nullable<string>
  lastName: Nullable<string>
  patronymic: Nullable<string>

}

interface Props {

}

const ProfileSellerFormInner = (props: Props) => {

  const appContext = useAppContext()
  const aboutMeContext = useAboutMeContext()

  const handleSubmit = async (data: IFormData) => {
    await aboutMeContext.update(data as IAboutMe)
    appContext.showSnackbar('Изменения сохранены', SnackbarType.success)
  }

  const initialValues: IFormData = {
    phone: appContext.aboutMe?.phone ?? null,
    firstName: appContext.aboutMe?.firstName ?? null,
    lastName: appContext.aboutMe?.lastName ?? null,
    patronymic: appContext.aboutMe?.patronymic ?? null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <div className={styles.root}>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <FormErrorScroll formik={formik} />
          <PhoneField
            name='phone'
            label='Телефон'
            disabled={true}
            validate={Validator.combine([Validator.required, Validator.phone])}
          />
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
          <Button spinner={aboutMeContext.editLoading} type='submit' className={styles.btn} styleType='large'
                  color='blue'>
            Сохранить
          </Button>
        </Form>
      </FormikProvider>
    </div>
  )
}


export default function ProfileSellerForm(props: Props) {
  return <AboutMeWrapper>
    <ProfileSellerFormInner/>
  </AboutMeWrapper>
}

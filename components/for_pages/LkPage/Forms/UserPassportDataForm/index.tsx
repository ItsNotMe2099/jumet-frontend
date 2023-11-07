import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {SnackbarType} from '@/types/enums'
import Button from '@/components/ui/Button'
import {IPassportData} from '@/data/interfaces/IPassportData'
import PassportFormSection from '@/components/for_pages/Common/PassportFormSection'
import {AboutMeWrapper, useAboutMeContext} from '@/context/aboutme_state'
import FormFieldset from '@/components/ui/FormFieldset'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import {Nullable} from '@/types/types'
import IAboutMe from '@/data/interfaces/IAboutMe'
import CheckBoxField from '@/components/fields/CheckBoxField'
import {Routes} from '@/types/routes'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData {
  firstName: Nullable<string>
  lastName: Nullable<string>
  patronymic: Nullable<string>
  passport: IPassportData
  isConfirmedPi: boolean
}

interface Props {
  onSubmit: (data: IFormData) => void
}

const UserPassportDataFormInner = (props: Props) => {
  const appContext = useAppContext()
  const aboutMeContext = useAboutMeContext()
  const aboutMe = appContext.aboutMe
  const passportData = aboutMe?.passport ?? {}
  const handleSubmit = async (data: IFormData) => {
    await aboutMeContext.update(data as IAboutMe)
    appContext.showSnackbar('Изменения сохранены', SnackbarType.success)
    props.onSubmit(data)
  }

  const initialValues: IFormData = {
    firstName: appContext.aboutMe?.firstName ?? null,
    lastName: appContext.aboutMe?.lastName ?? null,
    patronymic: appContext.aboutMe?.patronymic ?? null,
    isConfirmedPi: appContext.aboutMe?.isConfirmedPi ?? false,
    passport: {
      address: passportData?.address ?? null,
      date: passportData?.date ?? null,
      number: passportData?.number ?? null,
      issuedBy: passportData?.issuedBy ?? null,
      series: passportData?.series ?? null,
      scan: passportData?.scan ?? null,
    },
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
          <FormFieldset title={'ФИО*'}>
            <InputField
              name='lastName'
              placeholder='Ваша фамилия'
              validate={Validator.required}/>
            <InputField
              name='firstName'
              placeholder='Ваше имя'
              validate={Validator.required}/>
            <InputField
              name='patronymic'
              placeholder='Ваше отчество'/>
          </FormFieldset>
          <PassportFormSection/>
          <CheckBoxField name='isConfirmedPi'
                         validate={Validator.required}
                         label={`Отправляя форму, я даю своё согласие с [Политикой обработки персональных данных](${Routes.personalDataPolitics})`} />

          <Button spinner={aboutMeContext.editLoading} type='submit' className={styles.btn} styleType='large'
                  color='blue'>
            Сохранить
          </Button>
        </Form>
      </FormikProvider>
    </div>
  )
}


export default function UserPassportDataForm(props: Props) {
  return <AboutMeWrapper>
    <UserPassportDataFormInner onSubmit={props.onSubmit}/>
  </AboutMeWrapper>
}

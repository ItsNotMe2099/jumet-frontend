import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {useAppContext} from '@/context/state'
import {useState} from 'react'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import {IPassportData} from '@/data/interfaces/IPassportData'
import PassportFormSection from '@/components/for_pages/Common/PassportFormSection'
import FormError from '@/components/ui/FormError'
import Spacer from '@/components/ui/Spacer'
import CheckBoxField from '@/components/fields/CheckBoxField'
import {Routes} from '@/types/routes'
import {RepresentativeWrapper, useRepresentativeContext} from '@/context/representative_state'
import SuccessBlock from '@/components/for_pages/Common/SuccessBlock'
import UserUtils from '@/utils/UserUtils'
import Link from 'next/link'
import {RequestError} from '@/types/types'
import FormErrorScroll from '@/components/ui/FormErrorScroll'


interface IFormData {
  phone: string | null
  otpCode: string | null
  firstName: string | null,
  lastName: string | null,
  patronymic: string | null,
  policy: boolean
  passport: IPassportData

}

interface Props {

}

const RepresentativeRegistrationFormInner = (props: Props) => {
  const appContext = useAppContext()
  const representativeContext = useRepresentativeContext()
  const [error, setError] = useState<any>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async (data: IFormData) => {
    try {
      setError(null)
      await representativeContext.register({...data })
      setIsSuccess(true)
    }catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }
    }
  }

  const initialValues: IFormData = {
    phone: null,
    otpCode: null,
    firstName: null,
    lastName: null,
    patronymic: null,
    policy: false,
    passport: {
      address: null,
      date: null,
      number: null,
      issuedBy: null,
      series: null,
      scan: null,
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const handleReset = () => {
    formik.resetForm()
    setIsSuccess(false)
  }
  if(isSuccess){
    return <SuccessBlock title={'Вы зарегистрировались'} text={`Вы зарегистрировались как представитель продавца ${UserUtils.getName(representativeContext.representative?.owner ?? null)}`}
    actions={
      <Button  type='button' onClick={handleReset} className={styles.btn} styleType='large' color={'blue'}>
        Назад
      </Button>
    }/>
  }
  return (
    <div className={styles.root}>
      <div className={styles.title}>Регистрация представителя</div>
      <div className={styles.info}>
        Уже зарегистрировались как представитель продавца? Если хотите отозвать свои персональные данные перейдите на <Link href={Routes.representativeDeleteRegistration} className={styles.link}>форму отзыва</Link> персональных данных
      </div>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <FormErrorScroll formik={formik} />
          <InputField name='phone' format='phone' label='Телефон представителя*' validate={Validator.combine([Validator.required, Validator.phone])}/>
          <Spacer basis={24}/>
          <InputField name='otpCode' format='number' label='Код из СМС, отправленного на указанный номер*' validate={Validator.required}/>
          <Spacer basis={16}/>
          <div className={styles.heading}>ФИО Представителя*</div>
          <Spacer basis={8}/>
          <InputField
            name='lastName'
            placeholder='Фамилия'
            validate={Validator.required}/>
          <Spacer basis={12}/>
          <InputField
            name='firstName'
            placeholder='Имя'
            validate={Validator.required}/>
          <Spacer basis={12}/>
          <InputField
            name='patronymic'
            placeholder='Отчество'/>
          <Spacer basis={16}/>
          <div className={styles.heading}>Паспортные данные (необходимы для оформления приёмо-сдаточного акта)*</div>
          <Spacer basis={8}/>
          <PassportFormSection/>
          <Spacer basis={16}/>
          <CheckBoxField name='isConfirmedPi'
                         validate={Validator.required}
                         label={`Отправляя форму, я даю своё согласие с [Политикой обработки персональных данных](${Routes.personalDataPolitics})`}/>
          <FormError error={error}/>
          <Spacer basis={24}/>
          <Button disabled={representativeContext.editLoading} type='submit' className={styles.btn} styleType='large' color={'blue'}>
            Зарегистрироваться
          </Button>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default function RepresentativeRegistrationForm(props: Props) {
  return (<RepresentativeWrapper>
    <RepresentativeRegistrationFormInner/>
  </RepresentativeWrapper>)
}

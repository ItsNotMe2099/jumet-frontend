import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {useState} from 'react'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import FormError from '@/components/ui/FormError'
import Spacer from '@/components/ui/Spacer'
import {Routes} from '@/types/routes'
import {RepresentativeWrapper, useRepresentativeContext} from '@/context/representative_state'
import SuccessBlock from '@/components/for_pages/Common/SuccessBlock'
import UserUtils from '@/utils/UserUtils'
import Link from 'next/link'
import {RequestError} from '@/types/types'


interface IFormData {
  phone: string | null
  code: string | null

}

interface Props {

}

const RepresentativeDeleteRegistrationFormInner = (props: Props) => {
  const appContext = useAppContext()
  const representativeContext = useRepresentativeContext()
  const [error, setError] = useState<any>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async (data: IFormData) => {
    try {
      setError(null)
      await representativeContext.deleteRegistration(data)
      setIsSuccess(true)
    }catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }
    }
  }

  const initialValues: IFormData = {
    phone: null,
    code: null,
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
    return <SuccessBlock title={'Вы удалили свои персональные данные'} text={`Вы удалили свои персональные данные, используемые продавцом ${UserUtils.getName(representativeContext.representative?.owner ?? null)}`}
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
        Еще не зарегистрировались как представитель продавца? <Link href={Routes.representativeRegistration} className={styles.link}>Зарегистрироваться</Link>
      </div>
      <FormikProvider value={formik}>
        <Form className={styles.form}>

          <InputField name='phone' format='phone' label='Телефон представителя*'/>
          <Spacer basis={24}/>
          <InputField name='otpCode' format='number' label='Код из СМС, отправленного на указанный номер*'/>
          <FormError error={error}/>
           <Spacer basis={24}/>
          <Button spinner={representativeContext.editLoading} type='submit' className={styles.btn} styleType='large' color={'greyRed'}>
            Удалить
          </Button>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default function RepresentativeDeleteRegistrationForm(props: Props) {
  return (<RepresentativeWrapper>
    <RepresentativeDeleteRegistrationFormInner/>
  </RepresentativeWrapper>)
}

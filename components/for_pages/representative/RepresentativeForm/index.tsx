import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { useAppContext } from '@/context/state'
import { SnackbarType } from '@/types/enums'
import { useState } from 'react'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import { RequestError } from '@/types/types'
import RepresentativeRepository from '@/data/repositories/RepresentativeRepository'
import { IPassportData } from '@/data/interfaces/IPassportData'
import PassportFormSection from '@/components/for_pages/Common/PassportFormSection'
import FormError from '@/components/ui/FormError'
import Spacer from '@/components/ui/Spacer'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import classNames from 'classnames'
import CheckBoxField from '@/components/fields/CheckBoxField'


interface IFormData {
  phone: string | null
  code: string | null
  firstName: string | null,
  lastName: string | null,
  patronymic: string | null,
  policy: boolean
  passport: IPassportData

}
interface Props {

}

export default function RepresentativeForm(props: Props) {

  const appContext = useAppContext()
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await RepresentativeRepository.create(data)
      appContext.showSnackbar('Представитель добавлен', SnackbarType.success)

    } catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues: IFormData = {
    phone: null,
    code: null,
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

  return (
    <div className={styles.root}>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <InputField name='phone' format='phone' label='Телефон представителя*' />
          <Spacer basis={24} />
          <InputField name='code' format='number' label='Код из СМС, отправленного на указанный номер*' />
          <Spacer basis={16} />
          <div className={styles.heading}>ФИО Представителя*</div>
          <Spacer basis={8} />
          <InputField
            name='lastName'
            placeholder='Фамилия'
            validate={Validator.required} />
          <Spacer basis={12} />
          <InputField
            name='firstName'
            placeholder='Имя'
            validate={Validator.required} />
          <Spacer basis={12} />
          <InputField
            name='patronymic'
            placeholder='Отчество'/>
          <Spacer basis={16} />
          <div className={styles.heading}>Паспортные данные (необходимы для оформления приёмо-сдаточного акта)*</div>
          <Spacer basis={8} />
          <PassportFormSection />
          <Spacer basis={16} />
          <FormError error={error} />
          <CheckBoxField color={colors.grey400} name='policy'
            label={<>Отправляя форму, я даю своё согласие с <Link className={styles.policy} href={''}>Политикой обработки персональных<br /> данных</Link></>} />
          <Spacer basis={24} />
          <Button disabled={loading || !formik.values.policy} type='submit' className={classNames(styles.btn, { [styles.active]: formik.values.policy, [styles.disabled]: !formik.values.policy })} styleType='large' color={formik.values.policy ? 'blue' : 'lightBlue'}>
            Создать заявку
          </Button>
        </Form>
      </FormikProvider>
    </div>
  )
}

import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import PassportFormSection from '@/components/for_pages/Common/PassportFormSection'
import AddressField from '@/components/fields/AddressField'
import RadioField from '@/components/fields/RadioField'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import Switch from '@/components/ui/Switch'
import SelectField from '@/components/fields/SelectField'
import PlusSvg from '@/components/svg/PlusSvg'
import { colors } from '@/styles/variables'
import MastercardSvg from '@/components/svg/MastercardSvg'
import MaestroSvg from '@/components/svg/MaestroSvg'
import VisaSvg from '@/components/svg/VisaSvg'
import MirSvg from '@/components/svg/MirSvg'

interface Props {
  onSubmit: () => void
}

export default function OpeningStepForm(props: Props) {

  const handleSubmit = async () => {
    props.onSubmit()
  }

  const initialValues = {
    representativeId: null,
    name: '',
    lastName: '',
    patronymic: '',
    address: {
      address: '',
      city: '',
      street: '',
      house: ''
    },
    paymentType: '',
    card: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const radioOptions = [
    { label: 'Наличные', value: 'cash' },
    { label: 'Перевод на карту', value: 'transfer' },
    { label: 'Безнал', value: 'card' }
  ]

  const [isRepresentative, setIsRepresentative] = useState<boolean>(false)
  const [isDeliveryRequired, setIsDeliveryRequired] = useState<boolean>(true)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.title}>
            Оформить сделку
          </div>
          <div className={styles.switch}>
            <Switch checked={isRepresentative} onChange={() => setIsRepresentative(!isRepresentative)} />
            <div className={styles.text}>От имени представителя</div>
          </div>
          {!isRepresentative ?
            <>
              <InputField name='lastName' label='ФИО продавца*' placeholder='Фамилия' />
              <InputField name='name' placeholder='Имя' />
              <InputField name='name' placeholder='Отчество' />
              <div className={styles.passport}>
                <div className={styles.text}>Паспортные данные (необходимы для оформления приёмо-<br />сдаточного акта)*</div>
                <PassportFormSection />
              </div>
            </>
            :
            <>
              <SelectField name='representativeId' options={[]} label='Выберите представителя*' />
              <Button className={styles.add} icon={<PlusSvg color={colors.blue500} />}
                color='grey' styleType='large' >Добавить представителя</Button>
            </>
          }
          <div className={styles.switch}>
            <Switch checked={isDeliveryRequired} onChange={() => setIsDeliveryRequired(!isDeliveryRequired)} />
            <div className={styles.text}>Нужна доставка лома на пункт приёма</div>
          </div>
          {isDeliveryRequired ? <AddressField name='address.address' label='Адрес расположения лома*' /> : null}
          <RadioField options={radioOptions} name='paymentType' label='Предпочитаемый способ оплаты за лом' />
          {(formik.values.paymentType === 'card' ||
            formik.values.paymentType === 'transfer') &&
            <div className={styles.cards}>
              <div className={styles.label}>
                Укажите номер карты для приёма оплаты
              </div>
              <div className={styles.icons}>
                <MastercardSvg />
                <MaestroSvg />
                <VisaSvg />
                <MirSvg />
              </div>
              <InputField name='card' format='number' />
            </div>
          }
          <Button type='submit' className={styles.btn} color='blue' styleType='large' >Оформить сделку</Button>
        </div>
      </Form>
    </FormikProvider>
  )
}

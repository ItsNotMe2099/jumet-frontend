import SelectField from '@/components/fields/SelectField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useEffect, useState } from 'react'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import DealOfferOwnerRepository from '@/data/repositories/DealOfferOwnerRepository'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import { RequestError } from '@/types/types'
import Validator from '@/utils/validator'


interface Props {
  saleRequestId: number
}

export default function DealOfferForm(props: Props) {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IReceivingPoint[]>([])

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: IDealOffer) => {
    setLoading(true)
    try {
      await DealOfferOwnerRepository.create(data)
    } catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }

    }
    setLoading(false)
  }

  const initialValues = {
    saleRequestId: props.saleRequestId,
    receivingPointId: null,
    coverLetter: '',
    price: null,
    deliveryPrice: null,
    loadingPrice: null,
    rubbishInPercents: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik.values)


  const fetchReceivingPoints = async () => {
    await ReceivingPointOwnerRepository.fetch().then(data => {
      if (data) {
        setData(data)
      }
    })
  }

  useEffect(() => {
    fetchReceivingPoints()
  }, [])

  const options = data.map(i => { return { label: i.name, value: i.id } })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.title}>
          Предложение сделки
        </div>
        <SelectField validate={Validator.required} name='receivingPointId' options={options} label='Пункт приёма' />
        <InputField format='price' name='price' label='Цена за тонну лома без учета доставки' suffix={'₽'} />
        <InputField format='price' name='deliveryPrice' label='Стоимость доставки' suffix={'₽'} />
        <InputField format='price' name='loadingPrice' label='Стоимость погрузки' suffix={'₽'} />
        <InputField format='number' name='rubbishInPercents' suffix={'%'} label='Процент засора (предварительный)' />
        <InputField name='coverLetter' label='Комментарий к предложению' />
        <Button type='submit' className={styles.suggest} styleType='large' color='blue'>
          Предложить сделку
        </Button>
      </Form>
    </FormikProvider>
  )
}

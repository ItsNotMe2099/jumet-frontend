import SelectField from '@/components/fields/SelectField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useEffect, useState} from 'react'
import Button from '@/components/ui/Button'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import DealOfferOwnerRepository from '@/data/repositories/DealOfferOwnerRepository'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import {DeepPartial, IOption, Nullable, RequestError} from '@/types/types'
import Validator from '@/utils/validator'
import PercentField from '@/components/fields/PercentField'
import PriceField from '@/components/fields/PriceField'
import TextAreaField from '@/components/fields/TextAreaField'
import {ModalType, SnackbarType} from '@/types/enums'
import FormError from '@/components/ui/FormError'
import {useAppContext} from '@/context/state'
import {SuccessModalArguments} from '@/types/modal_arguments'
import { useReceivingPointListContext} from '@/context/receiving_point_list_state'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData{
  receivingPointId: Nullable<number>,
  coverLetter: Nullable<string>,
  price: Nullable<number>,
  deliveryPrice: Nullable<number>,
  loadingPrice: Nullable<number>,
  rubbishInPercents: Nullable<number>
}
interface Props {
  saleRequestId: number
}

export default function DealOfferForm(props: Props) {
  const appContext = useAppContext()
  const receivingPointListContext = useReceivingPointListContext()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IReceivingPoint[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {
      await DealOfferOwnerRepository.create({...data, saleRequestId: props.saleRequestId} as DeepPartial<IDealOffer>)
      appContext.showModal(ModalType.Success, {title: 'Ваше предложение отправлено', message: 'Продавец рассмотрит его'} as SuccessModalArguments)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
        setError(err.message)
      }

    }
    setLoading(false)
  }

  const initialValues: IFormData = {
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

  const receivingPointOptions: IOption<number | null>[] = receivingPointListContext.items.map(i => ({label: i.name, value: i.id}))

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <SelectField<number | null> validate={Validator.required} name='receivingPointId' options={receivingPointOptions} label='Пункт приёма' />
        <PriceField name='price' label='Цена за тонну лома без учета доставки' suffix={'₽'} validate={Validator.required} />
        <PriceField name='deliveryPrice' label='Стоимость доставки' suffix={'₽'} />
        <PriceField name='loadingPrice' label='Стоимость погрузки' suffix={'₽'} />
        <PercentField name='rubbishInPercents' suffix={'%'} label='Процент засора (предварительный)' />
        <TextAreaField autoSize name='coverLetter' label='Комментарий к предложению' />
        <FormError error={error}/>
        <Button type='submit' spinner={loading} className={styles.suggest} styleType='large' color='blue'>
          Предложить сделку
        </Button>
      </Form>
    </FormikProvider>
  )
}

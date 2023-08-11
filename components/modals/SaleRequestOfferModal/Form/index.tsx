import RadioField from '@/components/fields/RadioField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType, InputStyleType, ModalType, SnackbarType} from '@/types/enums'
import SwitchField from '@/components/fields/SwitchField'
import {useEffect, useState} from 'react'
import PhoneField from '@/components/fields/PhoneField'
import Button from '@/components/ui/Button'
import {useAppContext} from '@/context/state'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import {ILocation} from '@/data/interfaces/ILocation'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import Validator from '@/utils/validator'
import RadiusField from '@/components/fields/RadiusField'
import {useDataContext} from '@/context/data_state'
import {IOption} from '@/types/types'
import AddressField from '@/components/fields/AddressField'
import MapFullscreenField from '@/components/fields/MapFullscreenField'
import {IAddress} from '@/data/interfaces/IAddress'
import FileListField from '@/components/fields/Files/FileListField'
import WeightWithUnitField from '@/components/fields/WeightWithUnitField'
import PriceField from '@/components/fields/PriceField'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {format} from 'date-fns'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'
import {SuccessModalArguments} from '@/types/modal_arguments'

//import Select from '@/components/fields/Select'


interface Props {
  receivingPointId: number
}

interface IFormData {
  scrapMetalCategory?: ScrapMetalCategory
  weight: number
  photosIds: number[]
  requeresDelivery: boolean
  requeresLoading: boolean
  address: {
    address: string
    city: string
    street: string
    house: string
  }
  hasCustomPrice: boolean
  price: number
  searchRadius: number
  location: ILocation
  phones: string[]
}

export default function SaleRequestOfferForm(props: Props) {

  const dataContext = useDataContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ISaleRequest[]>([])

  const appContext = useAppContext()

  const handleSubmit = async (data: any) => {
    if (data.scrapMetalCategory === ScrapMetalCategory.None) {
      // Using object destructuring to create a copy of data without the scrapMetalCategory property
      const { scrapMetalCategory, ...dataWithoutScrapMetalCategory } = data
      data = dataWithoutScrapMetalCategory
    }
    setLoading(true)
    try {
      await SaleRequestOwnerRepository.create(data)
      appContext.showModal(ModalType.Success, {title: 'Ваше предложение отправлено', message: 'Пункт приема рассмотрит его'} as SuccessModalArguments)
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
  }

  const initialValues = {
    receivingPointId: props.receivingPointId,
    scrapMetalCategory: ScrapMetalCategory.None,
    weight: null,
    photosIds: [],
    requiresDelivery: false,
    requiresLoading: false,
    address: null,
    price: null,
    hasCustomPrice: false,
    searchRadius: null,
    location: null,
    radius: null,
    phones: []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  const scrapMetalCategories: IOption<string>[] = [
    ...dataContext.scrapMetalCategories.map(i => ({ label: i.name, value: i.category, description: i.description })),
    {
      label: 'Затрудняюсь определить', value: 'none'
    },
  ]
  const handleChangeAddress = (address: IAddress | string | null) => {
    if (typeof address !== 'string' && address?.location) {
      formik.setFieldValue('location', address.location)
    }
  }

  const fetchMySaleRequests = async () => {
    await SaleRequestOwnerRepository.fetch({statuses: [SaleRequestStatus.Published], page: 1, limit: 100}).then(data => {
      if (data) {
        setData(data.data)
      }
    })
  }

  useEffect(() => {
    fetchMySaleRequests()
  }, [])

  const [option, setOption] = useState<number | null | undefined>(null)

  const options = data.map(i => { return { label: format(new Date(i.createdAt), 'dd.MM.yyyy'), value: i.id } })

  console.log(formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
      {/*<Select label='Мои заявки на продажу лома' options={options} value={option} onChange={(value) => setOption(value)} />*/}
        <RadioField<string>
          label='Категория лома'
          name='scrapMetalCategory'
          options={scrapMetalCategories}
          styleType='default'
        />
        <WeightWithUnitField name='weight' label='Вес лома' />
        <FileListField
          name='photos'
          label='Фотографии лома'
          accept={[FileUploadAcceptType.Image]}
          isImage
        />
        <div className={styles.section}>
          <div className={styles.label}>
            Доставка и погрузка
          </div>
          <SwitchField name='requiresDelivery' label='Нужна доставка' />
          <SwitchField name='requiresLoading' label='Нужна погрузка' />
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Адрес расположения лома
          </div>
          <AddressField name={'address'} placeholder={'Введите адрес'} validate={Validator.required} onChange={handleChangeAddress} />
          <MapFullscreenField name={'location'} label={'Точка на карте'} validate={Validator.required} />
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Цена лома
          </div>
          <div className={styles.switch}>
            <SwitchField name={'hasCustomPrice'} label={'Указать желаемую цену за лом'} />
          </div>
          {formik.values.hasCustomPrice && <PriceField name='price' suffix={'₽/т'} placeholder='Моя цена за лом' validate={Validator.required} />}
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Радиус поиска пунктов приёма
          </div>
          <RadiusField name={'radius'} validate={Validator.required} />
        </div>
        <PhoneField styleType={InputStyleType.Default} name='phone' label='Ваш телефон' />
        <Button spinner={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Предложить сделку
        </Button>
      </Form>
    </FormikProvider>
  )
}

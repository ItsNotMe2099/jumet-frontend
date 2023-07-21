import RadioField from '@/components/fields/RadioField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { FileUploadAcceptType, InputStyleType, SnackbarType } from '@/types/enums'
import SwitchField from '@/components/fields/SwitchField'
import FileField from '@/components/fields/FileField'
import Switch from '@/components/ui/Switch'
import { useEffect, useState } from 'react'
import AddressYandexField from '@/components/fields/AddressYandexField'
import Tab from '@/components/ui/Tab'
import TextField from '@/components/fields/TextField'
import PhoneField from '@/components/fields/PhoneField'
import Button from '@/components/ui/Button'
import DropdownMenu from '@/components/ui/DropdownMenu'
import { useAppContext } from '@/context/state'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import { IAddress } from '@/data/interfaces/IAddress'
import { ILocation } from '@/data/interfaces/ILocation'
import { ScrapMetalCategory } from '@/data/enum/ScrapMetalCategory'
import Validator from '@/utils/validator'


interface Props {

}

interface IData {
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
  price: number
  searchRadius: number
  location: ILocation
  phones: string[]
}

export default function CreateSalesApplicationForm(props: Props) {

  const [loading, setLoading] = useState<boolean>(false)

  const appContext = useAppContext()

  const handleSubmit = async (data: IData) => {
    if (data.scrapMetalCategory === ScrapMetalCategory.None) {
      // Using object destructuring to create a copy of data without the scrapMetalCategory property
      const { scrapMetalCategory, ...dataWithoutScrapMetalCategory } = data;
      data = dataWithoutScrapMetalCategory;
    }
    setLoading(true)
    try {
      await SaleRequestOwnerRepository.create(data)
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
    scrapMetalCategory: ScrapMetalCategory.None,
    weight: 0,
    photosIds: [],
    requeresDelivery: false,
    requeresLoading: false,
    address: {
      address: '',
      city: '',
      street: '',
      house: ''
    },
    price: 0,
    searchRadius: 0,
    location: {
      lat: 0,
      lng: 0
    },
    phones: []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  const scrapMetalCategories = [
    {
      label: 'Mix 3-А', value: ScrapMetalCategory.MIX3_12A,
      description: 'Описание категории лома, например “Части арматуры, металлопрофили, уголки, балки'
    },
    {
      label: '3А', value: ScrapMetalCategory.A3,
      description: 'Описание категории лома, например “Части арматуры, металлопрофили, уголки, балки'
    },
    {
      label: '5-12А', value: ScrapMetalCategory.A5_12,
      description: 'Описание категории лома, например “Части арматуры, металлопрофили, уголки, балки'
    },
    {
      label: '13А', value: ScrapMetalCategory.A13,
      description: 'Описание категории лома, например “Части арматуры, металлопрофили, уголки, балки'
    },
    {
      label: '16А', value: ScrapMetalCategory.A16,
      description: 'Описание категории лома, например “Части арматуры, металлопрофили, уголки, балки'
    },
    {
      label: '20А', value: ScrapMetalCategory.A20,
      description: 'Описание категории лома, например “Части арматуры, металлопрофили, уголки, балки'
    },
    {
      label: 'Затрудняюсь определить', value: ScrapMetalCategory.None
    },
  ]

  const [priceEdit, setPriceEdit] = useState<boolean>(false)

  console.log(priceEdit)

  const radiusTabs = [
    { radius: '5' },
    { radius: '10' },
    { radius: '20' },
    { radius: '50' },
  ]

  const [filterRadius, setFilterRadius] = useState<string>('')

  const handleRadius = (radius: string) => {
    setFilterRadius(radius)
    formik.setFieldValue('searchRadius', radius)
  }

  const options = [
    { name: 'кг', label: 'кг' },
    { name: 'тонн', label: 'тонн' }
  ]

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <RadioField
          label='Категория лома'
          name='scrapMetalCategory'
          options={scrapMetalCategories}
          styleType='default'
        />
        <TextField isNumbersOnly name='weight' label='Вес лома' dropdown={() =>
          <DropdownMenu className={styles.drop} currentLabel={options[0].name} options={options} />} />
        <FileField
          name='photosIds'
          label='Фотографии лома'
          accept={[FileUploadAcceptType.Image]}
          vertical
          isImage
          text={<div className={styles.text}>Перетащите сюда или <span>выберите фото</span><br />
            лома на своем устройстве</div>}
        />
        <div className={styles.section}>
          <div className={styles.label}>
            Доставка и погрузка
          </div>
          <SwitchField name='requeresDelivery' label='Нужна доставка' />
          <SwitchField name='requeresLoading' label='Нужна погрузка' />
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Адрес расположения лома
          </div>
          <AddressYandexField name='address.city' placeholder='Город' validate={Validator.required} />
          <div className={styles.group}>
            <TextField name='address.street' placeholder='Улица' />
            <TextField isNumbersOnly className={styles.second} name='address.house' placeholder='Номер дома' />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Цена лома
          </div>
          <div className={styles.switch}>
            <Switch onChange={() => setPriceEdit(!priceEdit)} checked={priceEdit} />
            <div className={styles.label}>Указать желаемую цену за лом</div>
          </div>
          {priceEdit && <TextField isNumbersOnly name='price' placeholder='Моя цена за лом' />}
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Радиус поиска пунктов приёма
          </div>
          <div className={styles.tabs}>
            {radiusTabs.map((i, index) =>
              <Tab
                className={styles.tab}
                active={filterRadius === i.radius && formik.values.searchRadius === +i.radius}
                text={`${i.radius} км`}
                key={index}
                onClick={() => handleRadius(i.radius)} />
            )}
          </div>
          <TextField name='searchRadius' placeholder='Свой радиус поиска' sign='км' />
        </div>
        <PhoneField styleType={InputStyleType.Default} name='phones[0]' label='Ваш телефон' />
        <Button type='submit' className={styles.btn} styleType='large' color='blue'>
          Создать заявку
        </Button>
      </Form>
    </FormikProvider>
  )
}

import RadioField from '@/components/fields/RadioField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { FileUploadAcceptType, InputStyleType, SnackbarType } from '@/types/enums'
import SwitchField from '@/components/fields/SwitchField'
import FileField from '@/components/fields/Files/FileField'
import { useState } from 'react'
import AddressYandexField from '@/components/fields/AddressYandexField'
import InputField from '@/components/fields/InputField'
import PhoneField from '@/components/fields/PhoneField'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/state'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import { ILocation } from '@/data/interfaces/ILocation'
import { ScrapMetalCategory } from '@/data/enum/ScrapMetalCategory'
import Validator from '@/utils/validator'
import RadiusField from '@/components/fields/RadiusField'
import {useDataContext} from '@/context/data_state'
import {IOption} from '@/types/types'


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
  hasCustomPrice: boolean
  price: number
  searchRadius: number
  location: ILocation
  phones: string[]
}

export default function CreateSalesRequestForm(props: Props) {
  const dataContext = useDataContext()
  const [loading, setLoading] = useState<boolean>(false)

  const appContext = useAppContext()

  const handleSubmit = async (data: IData) => {
    if (data.scrapMetalCategory === ScrapMetalCategory.None) {
      // Using object destructuring to create a copy of data without the scrapMetalCategory property
      const { scrapMetalCategory, ...dataWithoutScrapMetalCategory } = data
      data = dataWithoutScrapMetalCategory
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
    hasCustomPrice: false,
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

  const scrapMetalCategories: IOption<string>[] = [
    ...dataContext.scrapMetalCategories.map(i => ({label: i.name, value: i.category, description: i.description})),
    {
      label: 'Затрудняюсь определить', value: 'none'
    },
  ]



  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <RadioField<string>
          label='Категория лома'
          name='scrapMetalCategory'
          options={scrapMetalCategories}
          styleType='default'
        />
        <InputField type={'number'} name='weight' label='Вес лома' suffix={'тонн'} />
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
          <SwitchField name='requiresDelivery' label='Нужна доставка' />
          <SwitchField name='requiresLoading' label='Нужна погрузка' />
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Адрес расположения лома
          </div>
          <AddressYandexField name='address.address' placeholder='Город' validate={Validator.required} />
          <div className={styles.group}>
            <InputField name='address.street' placeholder='Улица' />
            <InputField type={'number'} className={styles.second} name='address.house' placeholder='Номер дома' />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Цена лома
          </div>
          <div className={styles.switch}>
            <SwitchField name={'hasCustomPrice'} label={'Указать желаемую цену за лом'} />
          </div>
          {formik.values.hasCustomPrice && <InputField type={'number'} name='price' suffix={'₽/т'} placeholder='Моя цена за лом' />}
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Радиус поиска пунктов приёма
          </div>
         <RadiusField name={'radius'}/>
        </div>
        <PhoneField styleType={InputStyleType.Default} name='phones[0]' label='Ваш телефон' />
        <Button type='submit' className={styles.btn} styleType='large' color='blue'>
          Создать заявку
        </Button>
      </Form>
    </FormikProvider>
  )
}

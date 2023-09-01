import RadioField from '@/components/fields/RadioField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType} from '@/types/enums'
import SwitchField from '@/components/fields/SwitchField'
import {useState} from 'react'
import PhoneField from '@/components/fields/PhoneField'
import Button from '@/components/ui/Button'
import {ILocation} from '@/data/interfaces/ILocation'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import Validator from '@/utils/validator'
import {useDataContext} from '@/context/data_state'
import {DeepPartial, IOption} from '@/types/types'
import AddressField from '@/components/fields/AddressField'
import MapFullscreenField from '@/components/fields/MapFullscreenField'
import {IAddress} from '@/data/interfaces/IAddress'
import FileListField from '@/components/fields/Files/FileListField'
import WeightWithUnitField from '@/components/fields/WeightWithUnitField'
import PriceField from '@/components/fields/PriceField'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import IFile from '@/data/interfaces/IFile'
import FormErrorScroll from '@/components/ui/FormErrorScroll'


interface Props {
  loading: boolean
  saleRequest?: ISaleRequest | null
  submit: (data: DeepPartial<ISaleRequest>) => void
}

interface IFormData {
  requiresLoading: boolean;
  hasCustomPrice: boolean | undefined;
  address: IAddress | null;
  price: number | null;
  weight: number | null;
  phone: string | null;
  location: ILocation | null;
  requiresDelivery: boolean;
  scrapMetalCategory: ScrapMetalCategory;
  photos: IFile[];
  searchRadius: number | null
}

export default function CreateSalesRequestForm(props: Props) {

  const dataContext = useDataContext()
  const {loading, saleRequest} = props
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async (data: IFormData) => {

    let newData = data
    if (data.scrapMetalCategory === ScrapMetalCategory.None) {
    }
    props.submit({...data,
      photosIds: data.photos.map(i => i.id),
      ...(data.scrapMetalCategory === ScrapMetalCategory.None ? {scrapMetalCategory: null} : {})} as DeepPartial<ISaleRequest>)
  }

  const initialValues: IFormData = {
    scrapMetalCategory: saleRequest?.scrapMetalCategory ?? ScrapMetalCategory.None,
    weight: saleRequest?.weight ?? null,
    photos: saleRequest?.photos ?? [],
    requiresDelivery: saleRequest?.requiresDelivery ?? false,
    requiresLoading: saleRequest?.requiresLoading ?? false,
    address: saleRequest?.address ?? null,
    hasCustomPrice: (saleRequest?.price ?? 0) > 0 ?? false,
    price: saleRequest?.price ?? null,
    searchRadius: saleRequest?.searchRadius ?? null,
    location: saleRequest?.location ?? null,
    phone: saleRequest?.phone ?? null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  const scrapMetalCategories: IOption<string>[] = [
    ...dataContext.scrapMetalCategories.map(i => ({label: i.name, value: i.category, description: i.description})),
    {
      label: 'Затрудняюсь определить', value: 'none'
    },
  ]
  const handleChangeAddress = (address: IAddress | string | null) => {
    if (typeof address !== 'string' && address?.location) {
      formik.setFieldValue('location', address.location)
    }
  }
  console.log('FormikValues11', formik.values.address )

  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <FormErrorScroll formik={formik} />
        <RadioField<string>
          label='Категория лома'
          name='scrapMetalCategory'
          options={scrapMetalCategories}
          styleType='default'
        />
        <WeightWithUnitField name='weight' label='Вес лома'/>
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
          <SwitchField name='requiresDelivery' label='Нужна доставка'/>
          <SwitchField name='requiresLoading' label='Нужна погрузка'/>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Адрес расположения лома
          </div>
          <AddressField name={'address'} resettable={true} placeholder={'Введите адрес'} validate={Validator.required}
                        onChange={handleChangeAddress}/>
          {formik.values.address && <MapFullscreenField name={'location'} label={'Точка на карте'} helperText={'Вы можете уточнить координаты указанного вами адреса'} validate={Validator.required}/>}
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Цена лома
          </div>
          <div className={styles.switches}>
            <SwitchField name={'hasCustomPrice'} label={'Указать желаемую цену за лом'}/>
          </div>
          {formik.values.hasCustomPrice &&
            <PriceField name='price' suffix={'₽/т'} placeholder='Моя цена за лом' validate={Validator.required}/>}
        </div>
        <PhoneField name='phone' label='Ваш телефон'/>
        <div>
          <Button type='submit' styleType='large' color='blue' spinner={loading}>
            {props.saleRequest ? 'Сохранить' : 'Создать заявку'}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}

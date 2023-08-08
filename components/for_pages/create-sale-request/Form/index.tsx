import RadioField from '@/components/fields/RadioField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType, InputStyleType} from '@/types/enums'
import SwitchField from '@/components/fields/SwitchField'
import {useState} from 'react'
import PhoneField from '@/components/fields/PhoneField'
import Button from '@/components/ui/Button'
import {ILocation} from '@/data/interfaces/ILocation'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import Validator from '@/utils/validator'
import RadiusField from '@/components/fields/RadiusField'
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
  phones: string[] | null;
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

  const handleSubmit = async (data: any) => {

    if (data.scrapMetalCategory === ScrapMetalCategory.None) {
      // Using object destructuring to create a copy of data without the scrapMetalCategory property
      const {scrapMetalCategory, ...dataWithoutScrapMetalCategory} = data
      data = dataWithoutScrapMetalCategory
    }
    props.submit(data)
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
    phones: saleRequest?.phones ?? null,
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

  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
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
          vertical
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
          <AddressField name={'address'} placeholder={'Введите адрес'} validate={Validator.required}
                        onChange={handleChangeAddress}/>
          <MapFullscreenField name={'location'} label={'Точка на карте'} validate={Validator.required}/>
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
        <div className={styles.section}>
          <div className={styles.label}>
            Радиус поиска пунктов приёма
          </div>
          <RadiusField name={'radius'} validate={Validator.required}/>
        </div>
        <PhoneField styleType={InputStyleType.Default} name='phone' label='Ваш телефон'/>
        <div>
          <Button type='submit' styleType='large' color='blue' spinner={loading}>
            {props.saleRequest ? 'Сохранить' : 'Создать заявку'}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}

import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointAddressForm/index.module.scss'
import { Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import AddressField from '@/components/fields/AddressField'
import MapFullscreenField from '@/components/fields/MapFullscreenField'
import {IAddress} from '@/data/interfaces/IAddress'
import {ICompany} from '@/data/interfaces/ICompany'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ILocation} from '@/data/interfaces/ILocation'
import IFile from '@/data/interfaces/IFile'
import {ReactElement} from 'react'
import {DeepPartial} from '@/types/types'

interface IFormData {
  inn?: string | null
  company?: ICompany | null
  address?: DeepPartial<IAddress> | null
  phones?: {phone: string}[]
  location?: ILocation | null
  licenseScan?: IFile | null
}

interface Props {
  receivingPoint?: IReceivingPoint | null
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

export default function ReceivingPointAddressForm(props: Props) {
  const handleSubmit = async (data: IFormData) => {
    await props.onSubmit({
      location: data.location,
      address: data.address,
    } as DeepPartial<IReceivingPoint>)
  }

  console.log('rops.receivingPoint?.address?.address', props.receivingPoint?.address?.address)
  const initialValues: IFormData = {
    address: props.receivingPoint?.address ?? null,
    location: props.receivingPoint?.location ?? null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  const handleChangeAddress = (address: IAddress | string | null) => {
    if( typeof address !== 'string' && address?.location) {
      formik.setFieldValue('location', address.location)
    }
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
          <AddressField name={'address'} label={'Адрес'} validate={Validator.required} onChange={handleChangeAddress}/>
          <MapFullscreenField name={'location'} label={'Точка на карте'} validate={Validator.required}/>
        {props.footer}
      </Form>
    </FormikProvider>
  )
}

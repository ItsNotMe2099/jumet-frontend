import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DataStep/index.module.scss'
import { Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {FileUploadAcceptType} from '@/types/enums'
import FileField from '@/components/fields/Files/FileField'
import AddressField from '@/components/fields/AddressField'
import MapFullscreenField from '@/components/fields/MapFullscreenField'
import {IAddress} from '@/data/interfaces/IAddress'
import CompanyField from '@/components/fields/CompanyField'
import {ICompany} from '@/data/interfaces/ICompany'
import CompanyDetailsFormSection from '@/components/for_pages/Common/CompanyDetailsFormSection'
import {useState} from 'react'
import FormStepFooter from '@/components/ui/FormStepFooter'
import {DeepPartial, IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ILocation} from '@/data/interfaces/ILocation'
import IFile from '@/data/interfaces/IFile'
import Formatter from '@/utils/formatter'
import PhoneListField from '@/components/fields/PhoneListField'

interface IFormData {
  inn?: string | null
  company?: ICompany | null
  address?: DeepPartial<IAddress> | null
  phones?: {phone: string}[]
  location?: ILocation | null
  licenseScan?: IFile | null
}

interface Props extends IFormStepProps<DeepPartial<IReceivingPoint>>{

}

export default function DataStep(props: Props) {
  const [isCompanyDetailsEdit, setIsCompanyDetailsEdit] = useState(false)
  const handleSubmit = async (data: IFormData) => {
    props.onSubmit({
      name: data.address?.address,
      company: {...data.company, licenseScan: data.licenseScan},
      phones: data.phones?.map(i => Formatter.cleanPhone(i.phone)),
      location: data.location,
      address: data.address,

    } as DeepPartial<IReceivingPoint>)
  }

  const initialValues: IFormData = {
    inn: null,
    company: {
      name: null,
      inn: null,
      kpp: null,
      ogrn: null,
      address: null,
      legalType: null
    },
    address: null,
    location: null,
    phones: [{ phone: '' }],
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
  const handleChangeCompanyByInn = (company: ICompany | null) => {
    if(company) {
      formik.setFieldValue('company', company)
    }
  }
  const handleToggleEditCompanyDetails = (isEdit: boolean) => {
    setIsCompanyDetailsEdit(isEdit)
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {!isCompanyDetailsEdit && <CompanyField name={'inn'}  label='ИНН юр.лица*' onChange={handleChangeCompanyByInn} validate={Validator.required}/>}
        {(formik.values.inn || formik.values.company?.inn) && <CompanyDetailsFormSection onEditToggle={handleToggleEditCompanyDetails} company={formik.values.company!} />}
        <FileField
          name='licenseScan'
          accept={[FileUploadAcceptType.Image, FileUploadAcceptType.Document]}
          label='Лицензия ломозаготовителя*'
          validate={Validator.required}
          vertical
          isImage={true}
          text={<div className={styles.text}>Перетащите сюда или <span>выберите фото</span> лицензии<br />
            ломозаготовителя на своем устройстве</div>}
        />
        <div className={styles.address}>
          <AddressField name={'address'} label={'Адрес'} validate={Validator.required} onChange={handleChangeAddress}/>
          <MapFullscreenField name={'location'} label={'Точка на карте'} validate={Validator.required}/>
          <PhoneListField name={'phones'} label={'Телефоны пункта приема*'}/>
        </div>
        <FormStepFooter  onBack={props.onBack} spinner={props.loading}/>
      </Form>
    </FormikProvider>
  )
}

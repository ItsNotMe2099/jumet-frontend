import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DataStep/index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {FileUploadAcceptType, InputStyleType} from '@/types/enums'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import FileField from '@/components/fields/Files/FileField'
import PhoneField from '@/components/fields/PhoneField'
import AddressField from '@/components/fields/AddressField'
import MapFullscreenField from '@/components/fields/MapFullscreenField'
import {IAddress} from '@/data/interfaces/IAddress'
import CompanyField from '@/components/fields/CompanyField'
import {DeepPartial} from 'typeorm'
import {ICompany} from '@/data/interfaces/ICompany'
import CompanyDetailsFormSection from '@/components/for_pages/Common/CompanyDetailsFormSection'
import {useState} from 'react'
import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ILocation} from '@/data/interfaces/ILocation'
import IFile from '@/data/interfaces/IFile'

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
      console.log('SubmitData', data)
    props.onSubmit({
      name: data.address?.address,
      company: {...data.company, licenseScan: data.licenseScan},
      phones: data.phones?.map(i => i.phone),
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

  console.log('formik.values', formik.values)
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
          text={<div className={styles.text}>Перетащите сюда или <span>выберите фото</span> лицензии<br />
            ломозаготовителя на своем устройстве</div>}
        />
        <div className={styles.address}>
          <AddressField name={'address'} label={'Адрес'} validate={Validator.required} onChange={handleChangeAddress}/>
          <MapFullscreenField name={'location'} label={'Точка на карте'} validate={Validator.required}/>
          <FieldArray name='phones'>
            {arrayHelpers => (
              <>
                <div className={styles.phones}>
                  {formik.values.phones?.map((i, index) =>
                    <PhoneField
                      styleType={InputStyleType.Default}
                      key={index}
                      label={index === 0 ? 'Телефон пункта приёма*' : ''}
                      name={`phones[${index}].phone`}
                      validate={Validator.phone}
                    />
                  )}
                </div>
                <Button onClick={() => arrayHelpers.push({ phone: '' })} type='button' className={styles.add} styleType='large' color='grey'>
                  <CirclePlusSvg color={colors.blue500} />
                  Добавить еще номер
                </Button>
              </>
            )}
          </FieldArray>
        </div>
        <FormStepFooter  onBack={props.onBack} spinner={props.loading}/>
      </Form>
    </FormikProvider>
  )
}

import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DataStep/index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {FileUploadAcceptType, InputStyleType} from '@/types/enums'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import StepsControls from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/StepsControls'
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


interface Props {
  onNextStep: (data?: any) => void
}

export default function DataStep(props: Props) {
  const [isCompanyDetailsEdit, setIsCompanyDetailsEdit] = useState(false)
  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const initialValues = {
    address: '',
    street: '',
    number: '',
    phones: [{ phone: '' }],
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)
  const handleChangeAddress = (address: IAddress) => {
    if(address.location) {
      formik.setFieldValue('location', address.location)
    }
  }
  const handleChangeCompanyByInn = (company: DeepPartial<ICompany>) => {
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
        {(formik.values.inn || formik.values.company) && <CompanyDetailsFormSection onEditToggle={handleToggleEditCompanyDetails} company={formik.values.company} />}
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
                  {formik.values.phones.map((i, index) =>
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
        <StepsControls />
      </Form>
    </FormikProvider>
  )
}

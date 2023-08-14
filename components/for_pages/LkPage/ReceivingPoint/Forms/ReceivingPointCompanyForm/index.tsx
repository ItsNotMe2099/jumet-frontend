import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointCompanyForm/index.module.scss'
import { Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import AddressField from '@/components/fields/AddressField'
import {ReactElement} from 'react'
import InputField from '@/components/fields/InputField'
import RadioField from '@/components/fields/RadioField'
import {FileUploadAcceptType} from '@/types/enums'
import FileField from '@/components/fields/Files/FileField'
import IFile from '@/data/interfaces/IFile'
import {ICompany, LegalType} from '@/data/interfaces/ICompany'
import {DeepPartial} from '@/types/types'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData {
  legalType?: LegalType | null
  name?: string | null
  inn?: string| null
  kpp?: string| null
  ogrn?: string| null
  address?: string | null
  licenseScan?: IFile | null

}

interface Props {
  company: ICompany| null
  footer: ReactElement
  onSubmit: (data: DeepPartial<ICompany>) => Promise<void>
}

export default function ReceivingPointCompanyForm(props: Props) {
  const handleSubmit = async (data: IFormData) => {
    await props.onSubmit(data as DeepPartial<ICompany>)
  }

  const initialValues: IFormData = {
    name: props.company?.name ?? null,
    inn: props.company?.inn ?? null,
    kpp: props.company?.kpp ?? null,
    ogrn: props.company?.ogrn ?? null,
    address: props.company?.address ?? null,
    legalType: props.company?.legalType ?? null,
    licenseScan: props.company?.licenseScan ?? null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <FormErrorScroll formik={formik} />
        <InputField
          name={'inn'}
          label='ИНН юр.лица*'
          validate={Validator.required}/>
        <InputField
          name={'name'}
          label='Наименование юр. лица*'
          validate={Validator.required}/>
        <RadioField<LegalType>
          styleType={'default'}
          name={'legalType'}
          label='Форма собственности'
          options={[{label: 'Юридическиео лицо', value: LegalType.LegalEntity},
            {label: 'Индивидуальный предприниматель', value: LegalType.Ip}]}
          validate={Validator.required}/>
        <AddressField
          name={'address'}
          label='Юрюдический адрес*'
          isString
          validate={Validator.required}/>
        <InputField
          name={'ogrn'}
          label='ОГРН*'
          validate={Validator.required}/>
        {formik.values.legalType !== LegalType.Ip && <InputField
          name={'kpp'}
          label='КПП*'
          validate={Validator.required}/>}
        <FileField
          name='licenseScan'
          accept={[FileUploadAcceptType.Image, FileUploadAcceptType.Document]}
          label='Лицензия ломозаготовителя*'
          validate={Validator.required}
          isImage={true}
          text={<div className={styles.text}>Перетащите сюда или <span>выберите фото</span> лицензии<br />
            ломозаготовителя на своем устройстве</div>}
        />
        {props.footer}
      </Form>
    </FormikProvider>
  )
}

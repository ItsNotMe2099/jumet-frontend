import TextField from '@/components/fields/TextField'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DataStep/index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import Input from '@/components/ui/Input'
import {FileUploadAcceptType, InputStyleType, LabelStyleType} from '@/types/enums'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import StepsControls from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/StepsControls'
import FileField from '@/components/fields/Files/FileField'
import PhoneField from '@/components/fields/PhoneField'


interface Props {
  onNextStep: (data?: any) => void
}

export default function DataStep(props: Props) {

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

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <Input labelType={LabelStyleType.Static} label='ИНН юр.лица*' />
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
          <TextField placeholder='Город' name='address' label='Адрес пункта приёма*' validate={Validator.required} />
          <div className={styles.bottom}>
            <TextField className={styles.input} placeholder='Улица' name='street' validate={Validator.required} />
            <TextField className={styles.input} placeholder='Номер дома' isNumbersOnly name='number' validate={Validator.required} />
          </div>
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

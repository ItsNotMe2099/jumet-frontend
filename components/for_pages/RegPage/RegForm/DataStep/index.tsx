import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Input from '@/components/ui/Input'
import { LabelStyleType } from '@/types/enums'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'


interface Props {
  onNextStep: (data?: any) => void
}

export default function DataStep(props: Props) {

  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const [phoneValues, setPhoneValues] = useState<string[]>([''])

  const addPhoneField = () => {
    setPhoneValues([...phoneValues, '']) // add a new empty phone field to the array
  }

  const initialValues = {
    address: '',
    street: '',
    number: '',
    phones: phoneValues
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
        <div className={styles.address}>
          <TextField placeholder='Город' name='address' label='Адрес пункта приёма*' validate={Validator.required} />
          <div className={styles.bottom}>
            <TextField placeholder='Улица' name='street' validate={Validator.required} />
            <TextField placeholder='Номер дома' isNumbersOnly name='number' validate={Validator.required} />
          </div>
          {phoneValues.map((phoneValue, index) => (
            <TextField
              key={index}
              label={index === 0 ? 'Телефон пункта приёма*' : ''}
              name={`phones[${index}]`}
              validate={Validator.phone}
              isNumbersOnly
            />
          ))}
          <Button onClick={addPhoneField} type='button' className={styles.add} styleType='large' color='grey'>
            <CirclePlusSvg color={colors.blue500} />
            Добавить еще номер
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}

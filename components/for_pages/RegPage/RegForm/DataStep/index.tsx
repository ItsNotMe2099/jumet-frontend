import TextField from '@/components/fields/TextField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Input from '@/components/ui/Input'
import { LabelStyleType } from '@/types/enums'


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
    phone: ''
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
          <TextField label='Телефон пункта приёма*' name='phone' />
        </div>
      </Form>
    </FormikProvider>
  )
}

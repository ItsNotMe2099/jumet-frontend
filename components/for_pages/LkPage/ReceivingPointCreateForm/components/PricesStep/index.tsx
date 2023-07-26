import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/PricesStep/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'


interface Props {
  onNextStep: (data?: any) => void
  onBack?: () => void
}

export default function PricesStep(props: Props) {

  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const initialValues = {

  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>

      </Form>
    </FormikProvider>
  )
}

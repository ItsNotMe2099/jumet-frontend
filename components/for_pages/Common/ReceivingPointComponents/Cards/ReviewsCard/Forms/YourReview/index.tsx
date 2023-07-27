import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import InputField from '@/components/fields/InputField'
import StarRatingsField from '@/components/fields/StarRatingsField'


interface Props {

}

export default function YourReviewForm(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    text: '',
    rating: 0
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField
          validate={Validator.required}
          name='text'
          label='Ваш отзыв'
          placeholder='Опишите свои впечатления о сотрудничестве'
        />
        <StarRatingsField name='rating' label='Оценка пункту приёма' />
        <Button type='submit' className={styles.btn} color='blue' styleType='large'>
          Добавить отзыв
        </Button>
      </Form>
    </FormikProvider>
  )
}

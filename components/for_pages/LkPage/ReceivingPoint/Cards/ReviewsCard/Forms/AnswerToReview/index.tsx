import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/Forms/AnswerToReview/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import InputField from '@/components/fields/InputField'


interface Props {

}

export default function AnswerToReviewForm(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    text: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField
          validate={Validator.required}
          name='text'
          label='Ответ на отзыв'
          placeholder='Ваш ответ'
        />
        <Button type='submit' className={styles.btn} color='blue' styleType='large'>
          Ответить на отзыв
        </Button>
      </Form>
    </FormikProvider>
  )
}
import styles from '@/components/for_pages/Common/Forms/ReviewAnswerForm/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import {ReviewWrapper, useReviewContext} from '@/context/review_state'
import IReview from '@/data/interfaces/IReview'
import TextAreaField from '@/components/fields/TextAreaField'

interface IFormData{
  answer: string
}
interface Props {
  review: IReview
}

const ReviewAnswerFormInner = (props: Props) => {
  const reviewContext = useReviewContext()
  const handleSubmit = async (data: IFormData) => {
    await reviewContext.answer({...data, dealId: reviewContext.dealId})
  }

  const initialValues: IFormData = {
    answer: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextAreaField
          validate={Validator.required}
          name='answer'
          label='Ответ на отзыв'
          placeholder='Ваш ответ'
          disabled={reviewContext.editLoading}
        />
        <div>
        <Button spinner={reviewContext.editLoading} type='submit'  color='blue' styleType='large'>
          Ответить на отзыв
        </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}


export default function ReviewAnswerForm(props: Props) {
  return <ReviewWrapper dealId={props.review.dealId} reviewId={props.review.id} review={props.review}>
    <ReviewAnswerFormInner review={props.review}/>
  </ReviewWrapper>
}

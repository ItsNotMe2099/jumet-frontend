import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import StarRatingsField from '@/components/fields/StarRatingsField'
import TextAreaField from '@/components/fields/TextAreaField'
import {ReviewWrapper, useReviewContext} from '@/context/review_state'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import {useDealContext} from '@/context/deal_state'

interface IFormData {
  mark: number
  content: string
}

interface Props {
  initialOpen?: true
}

const ReviewFormStepCardInner = (props: Props) => {
  const reviewContext = useReviewContext()
  const handleSubmit = async (data: IFormData) => {
    await reviewContext.create({...data, dealId: reviewContext.dealId})
  }

  const initialValues: IFormData = {
    mark: 0,
    content: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const isDisabled = !formik.values.mark && !formik.values.content
  return (
    <DealStepResultCardLayout title={'Отзыв о сотрудничестве'} date={null} initialOpen={props.initialOpen ?? false}>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <TextAreaField
            disabled={reviewContext.editLoading}
            name='content'
            label='Ваш отзыв'
            placeholder='Опишите свои впечатления о сотрудничестве'
          />
          <StarRatingsField disabled={reviewContext.editLoading} name='mark' label='Оценка пункту приёма'
                            validate={Validator.required}/>
          <div>
            <Button disabled={isDisabled} spinner={reviewContext.editLoading}
                    type='submit' color={isDisabled ? 'lightBlue' : 'blue'} styleType='large'>
              Добавить отзыв
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </DealStepResultCardLayout>
  )
}

export default function ReviewFormStepCard(props: Props) {
  const dealContext = useDealContext()
  return <ReviewWrapper dealId={dealContext.dealId}>
    <ReviewFormStepCardInner initialOpen={props.initialOpen}/>
  </ReviewWrapper>
}

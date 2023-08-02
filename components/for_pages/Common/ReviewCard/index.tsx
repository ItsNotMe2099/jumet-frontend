import styles from './index.module.scss'
import AnswerToReviewForm from '@/components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/Forms/AnswerToReview'
import RatingStars from '@/components/ui/RatingStars'
import IReview from '@/data/interfaces/IReview'

interface Props {
  item: IReview
  showAnswerForm?: boolean
}

export default function ReviewCard(props: Props) {
  const {item} = props
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.phone}>{item.user?.phone}</div>
        <div className={styles.date}>{item.createdAt}</div>
      </div>
      <div className={styles.rating}>
        <RatingStars rating={item.mark}/>
      </div>
      <div className={styles.comment}>
        {item.content}
      </div>
      {item.answer &&
        <div className={styles.answer}>
          <div className={styles.title}>
            Ваш ответ
          </div>
          <div className={styles.comment}>
            {item.answer}
          </div>
        </div>
      }
      {props.showAnswerForm &&  !item.answer &&
        <AnswerToReviewForm />
      }
    </div>
  )
}

import styles from 'components/for_pages/Common/Cards/ReviewCard/index.module.scss'
import ReviewAnswerForm from '@/components/for_pages/Common/Forms/ReviewAnswerForm'
import RatingStars from '@/components/ui/RatingStars'
import IReview from '@/data/interfaces/IReview'
import Formatter from '@/utils/formatter'

interface Props {
  item: IReview
  showAnswerForm?: boolean
  showAsYourAnswerLabel?: boolean
}

export default function ReviewCard(props: Props) {
  const {item} = props
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.phone}>{item.user?.phone}</div>
        <div className={styles.date}>{Formatter.formatDateRelative(item.createdAt)}</div>
      </div>

        <RatingStars rating={item.mark}/>
      <div className={styles.comment}>
        {item.content}
      </div>
      {item.answer &&
        <div className={styles.answer}>
          <div className={styles.title}>
            {props.showAsYourAnswerLabel ? 'Ваш ответ:' : 'Ответ пункта приема:'}
          </div>
          <div className={styles.comment}>
            {item.answer}
          </div>
        </div>
      }
      {props.showAnswerForm &&  !item.answer &&
        <ReviewAnswerForm review={item} />
      }
    </div>
  )
}

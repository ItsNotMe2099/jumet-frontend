import styles from './index.module.scss'
import ReviewCard from 'components/for_pages/Common/Cards/ReviewCard'
import {ReviewListWrapper, useReviewListContext} from '@/context/reviews_list_state'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'

interface Props {
  receivingPoint: IReceivingPoint
}

const ReviewsViewCardInner = (props: Props) => {
  const reviewListContext = useReviewListContext()

  if(reviewListContext.data.total === 0){
    return null
  }
  return (
    <ReceivingPointViewCard title='Отзывы'>
      <div className={styles.root}>
        {reviewListContext.data.data.map((i, index) =>
          <ReviewCard item={i} key={index}/>
        )}
      </div>
    </ReceivingPointViewCard>
  )
}
export default function ReviewsViewCard(props: Props) {
  return <ReviewListWrapper receivingPointId={props.receivingPoint.id}>
    <ReviewsViewCardInner receivingPoint={props.receivingPoint}/>
  </ReviewListWrapper>
}

import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/index.module.scss'
import ReviewCard from 'components/for_pages/Common/ReviewCard'
import {ReviewListWrapper, useReviewListContext} from '@/context/reviews_list_state'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'

interface Props {
  receivingPoint: IReceivingPoint
}

const ReviewsViewCardInner = (props: Props) => {
  const reviewListContext = useReviewListContext()

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

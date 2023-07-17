import IPointData from '@/data/interfaces/IPointData'
import CardLayout from '../../../CardLayout'
import styles from './index.module.scss'
import ReviewCard from './ReviewCard'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import YourReviewForm from './Forms/YourReview'

interface Props {
  item: IPointData
  cardLayoutClass?: string
}

export default function ReviewsCard({ item, cardLayoutClass }: Props) {

  const appContext = useAppContext()
  const router = useRouter()

  return (
    <CardLayout className={cardLayoutClass} title='Отзывы'>
      <div className={styles.root}>
        {item.reviews.map((i, index) =>
          <ReviewCard item={i} key={index} />
        )}
        {appContext.token && router.asPath === `/receiving-point/${item.id}` &&
          <YourReviewForm />
        }
      </div>
    </CardLayout>
  )
}
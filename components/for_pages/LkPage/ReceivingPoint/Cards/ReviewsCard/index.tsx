import IPointData from '@/data/interfaces/IPointData'
import CardLayout from 'components/for_pages/Common/CardLayout'
import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/index.module.scss'
import ReviewCard from 'components/for_pages/Common/ReviewCard'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import YourReviewForm from 'components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/Forms/YourReview'

interface Props {
  item: IPointData
  cardLayoutClass?: string
  cardLayoutTitleClass?: string
}

export default function ReviewsCard({ item, cardLayoutClass, cardLayoutTitleClass }: Props) {

  const appContext = useAppContext()
  const router = useRouter()

  return (
    <CardLayout title='Отзывы'>
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

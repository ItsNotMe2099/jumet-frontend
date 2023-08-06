import {useRouter} from 'next/router'
import {ReviewListWrapper, useReviewListContext} from '@/context/reviews_list_state'
import styles from '@/components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/index.module.scss'
import ReviewCard from '@/components/for_pages/Common/ReviewCard'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'

interface Props {

}

const ReceivingPointReviewsPageInner = (props: Props) => {
  const reviewListContext = useReviewListContext()

  return (
    <div className={styles.root}>
      {reviewListContext.data.data.map((i, index) =>
        <ReviewCard item={i} key={index}/>
      )}
    </div>
  )
}
const ReceivingPointReviewsPage = (props: Props) => {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)

  return (
      <ReviewListWrapper receivingPointId={id}>
        <ReceivingPointReviewsPageInner/>
      </ReviewListWrapper>)
}
ReceivingPointReviewsPage.getLayout = LkReceivingPageLayout
export default  ReceivingPointReviewsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

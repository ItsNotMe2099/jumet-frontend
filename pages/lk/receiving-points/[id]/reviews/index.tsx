import {useRouter} from 'next/router'
import styles from './index.module.scss'
import ReviewCard from '@/components/for_pages/Common/Cards/ReviewCard'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'
import {ReviewListWrapper, useReviewListContext} from '@/context/reviews_list_state'
import CardLayoutList from '@/components/for_pages/Common/CardLayoutList'
import ContentLoader from '@/components/ui/ContentLoader'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {

}

const ReceivingPointReviewsPageInner = (props: Props) => {
  const reviewListContext = useReviewListContext()
  return (
    <div>

      {!reviewListContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
      {reviewListContext.isLoaded && reviewListContext.data.total === 0 &&
        <EmptyStub title={'Пока нет отзывов'} text={'Здесь будут отображаться отзывы о пункте приема, которые могут сделать продавцы полсе выполнения сделки'} actions={ <Button href={Routes.saleRequests} styleType='large' color='blue'>
          Купить лом
        </Button>}/>}
      <InfiniteScroll
        dataLength={reviewListContext.data.data.length}
        next={reviewListContext.fetchMore}
        style={{overflow: 'inherit'}}
        loader={reviewListContext.data.total > 0 ?
          <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
        hasMore={reviewListContext.data.total > reviewListContext.data.data.length}
        scrollThreshold={0.6}>
        <CardLayoutList>
        {reviewListContext.data.data.map((i, index) =>
          <div className={styles.card}><ReviewCard item={i} key={index} showAsYourAnswerLabel/></div>
        )}
        </CardLayoutList>
      </InfiniteScroll>
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

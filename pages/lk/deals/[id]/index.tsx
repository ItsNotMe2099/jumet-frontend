import {useRouter} from 'next/router'
import DealEdit from '@/components/for_pages/LkPage/DealEdit'
import styles from 'pages/lk/deals/[id]/index.module.scss'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import {getAuthServerSideProps} from '@/utils/auth'
import {DealWrapper, useDealContext} from '@/context/deal_state'
import ContentLoader from '@/components/ui/ContentLoader'
import {LkPageBaseLayout} from '@/pages/lk'


const LkDealPageInner = () => {
  const dealContext = useDealContext()
  return (
      <div className={styles.root}>
        {dealContext.loading && <ContentLoader style={'block'}/>}
        {!dealContext.loading && dealContext.deal && <>
          <div className={styles.colLeft}>
            <DealEdit/>
          </div>
          <ChatOnPage sellerId={dealContext.deal!.sellerId!} receivingPointId={dealContext.deal!.receivingPointId!}/>
        </>}
      </div>
  )
}

const LkDealPage = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)

  return <DealWrapper dealId={id}>
    <LkDealPageInner/>
  </DealWrapper>
}
LkDealPage.getLayout = LkPageBaseLayout
export default LkDealPage
export const getServerSideProps = getAuthServerSideProps()

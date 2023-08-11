import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'
import DealEdit from '@/components/for_pages/LkPage/DealEdit'
import styles from 'pages/lk/deals/[id]/index.module.scss'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import {getAuthServerSideProps} from '@/utils/auth'
import {DealWrapper, useDealContext} from '@/context/deal_state'
import ContentLoader from '@/components/ui/ContentLoader'


const LkDealPageInner = () => {
  const dealContext = useDealContext()
  return (
    <Layout>
      <div className={styles.root}>
        {dealContext.loading && <ContentLoader style={'block'}/>}
        {!dealContext.loading && dealContext.deal && <>
          <div className={styles.colLeft}>
            <DealEdit/>
          </div>
          <ChatOnPage receivingPointId={dealContext.deal!.receivingPointId!}/>
        </>}
      </div>
    </Layout>
  )
}

export default function LkDealPage() {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)

  return <DealWrapper dealId={id}>
    <LkDealPageInner/>
  </DealWrapper>
}

export const getServerSideProps = getAuthServerSideProps()

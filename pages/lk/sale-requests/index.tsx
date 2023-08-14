import styles from 'pages/lk/sale-requests/index.module.scss'
import {useMemo, useState} from 'react'
import {
  ISaleRequestFilter,
  SaleRequestListOwnerWrapper,
  useSaleRequestListOwnerContext
} from '@/context/sale_request_list_owner_state'
import {useRouter} from 'next/router'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'
import Tabs from '@/components/ui/Tabs'
import {IOption} from '@/types/types'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
import {LkPageBaseLayout} from '@/pages/lk'
import SaleRequestOwnerCard from '@/components/for_pages/Common/Cards/SaleRequestOwnerCard'
import {useNotificationContext} from '@/context/notifications_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'

enum TabKey {
  Active = 'active',
  Completed = 'completed'
}

interface Props {

}

const LkSalesRequestsPageInner = (props: Props) => {
  const saleRequestListOwnerContext = useSaleRequestListOwnerContext()
  const notifyContext = useNotificationContext()
  const router = useRouter()
  const [tab, setTab] = useState<TabKey>(router.query?.active as TabKey ?? TabKey.Active)
  const badgeActive = notifyContext.getTotalByTypes([

  ])
  const getFilterByTab = (tab: TabKey): ISaleRequestFilter => {
    switch (tab){
      case TabKey.Active:
        return {statuses: [SaleRequestStatus.Draft, SaleRequestStatus.Published]}
      case TabKey.Completed:
        return {statuses: [SaleRequestStatus.Completed]}
    }
  }
  const handleChangeTab = (tab: TabKey) => {
    setTab(tab)
    saleRequestListOwnerContext.setFilter(getFilterByTab(tab))
  }
  const tabs: IOption<TabKey>[] = [
    {label: 'Активные', value: TabKey.Active},
    {label: ' Завершенные', value: TabKey.Completed},
  ]
  useEffectOnce(() => {
    saleRequestListOwnerContext.setFilter(getFilterByTab(tab))
  })

  const stubData = useMemo<{title: string, text: string}>(() => {
    switch (tab){
      case TabKey.Active:
        return {
          title: 'Пока нет предложений',
          text: 'Здесь будут появляется предложения, которые вы сделали продавцам',
        }
      case TabKey.Completed:
        return {
          title: 'Пока нет принятых предложений',
          text: 'Здесь будут появляется принятые продавцами предложения, которые вы сделали продавцам',
        }
    }
  }, [tab])

  return (
      <div className={styles.root}>
        <div className={styles.title}>
          Мои заявки на продажу
        </div>
        <Tabs<TabKey> options={tabs} value={tab} styleType={'outlined'} onClick={handleChangeTab}/>
        {!saleRequestListOwnerContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
        {saleRequestListOwnerContext.isLoaded && saleRequestListOwnerContext.data.total === 0 &&
          <EmptyStub title={stubData.title} text={stubData.text} actions={ <Button href={Routes.lkSaleRequestCreate} styleType='large' color='blue'>
            Продать лом
          </Button>}/>}
        <InfiniteScroll
          dataLength={saleRequestListOwnerContext.data.data.length}
          next={saleRequestListOwnerContext.fetchMore}
          style={{overflow: 'inherit'}}
          loader={saleRequestListOwnerContext.data.total > 0 ?
            <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={saleRequestListOwnerContext.data.total > saleRequestListOwnerContext.data.data.length}
          scrollThreshold={0.6}>
          <div className={styles.list}>
            {saleRequestListOwnerContext.data.data.map((i, index) =>
              <SaleRequestOwnerCard mode={'seller'} item={i} key={i.id}/>
            )}
          </div>
        </InfiniteScroll>
      </div>
  )
}
const LkSalesRequestsPage = (props: Props) => {
  return <SaleRequestListOwnerWrapper>
    <LkSalesRequestsPageInner/>
  </SaleRequestListOwnerWrapper>
}
LkSalesRequestsPage.getLayout = LkPageBaseLayout
export default LkSalesRequestsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)

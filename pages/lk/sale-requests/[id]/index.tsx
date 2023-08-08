import styles from './index.module.scss'
import {
  DealOfferListOwnerWrapper,
  IDealOfferFilter,
  useDealOfferListOwnerContext
} from '@/context/deal_offers_list_owner_state'
import SaleRequestDetailsCard from '@/components/for_pages/LkPage/SaleRequest/SaleRequestDetailsCard'
import Tabs from '@/components/ui/Tabs'
import {useEffect, useState} from 'react'
import {IOption} from '@/types/types'
import SaleRequestDealOfferCard from '@/components/for_pages/LkPage/SaleRequest/SaleRequestDealOfferCard'
import {SaleRequestOwnerWrapper, useSaleRequestOwnerContext} from '@/context/sale_request_owner_state'
import {useRouter} from 'next/router'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import {Routes} from '@/types/routes'
import queryString from 'query-string'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import ClientOnly from '@/components/visibility/ClientOnly'
import {useAppContext} from '@/context/state'
import Layout from '@/components/layout/Layout'

enum TabKey {
  All = 'all',
  New = 'new',
  Familiar = 'familiar',
  Rejected = 'rejected'
}

interface Props {

}


const SaleRequestPageInner = (props: Props) => {
  const router = useRouter()
  const appContext = useAppContext()
  const saleRequestId = parseInt(router.query.id as string, 10)
  const saleRequestOwnerContext = useSaleRequestOwnerContext()
  const dealOfferListOwnerContext = useDealOfferListOwnerContext()
  const [tab, setTab] = useState<TabKey>(router.query.type as TabKey ?? TabKey.All)
  console.log('SaleRequestPageInner11', saleRequestOwnerContext.saleRequest, saleRequestOwnerContext.loading)

  const tabs: IOption<TabKey>[] = [
    {label: 'Все предложения', value: TabKey.All},
    {label: 'Новые', value: TabKey.New},
    {label: 'Знакомые', value: TabKey.Familiar},
    {label: 'Отклоненные', value: TabKey.Rejected}
  ]

  useEffect(() => {
    reFetch(tab)
  }, [tab, saleRequestId])
  const convertTabKeyToFilter = (tab: TabKey): IDealOfferFilter => {
    switch (tab) {
      case TabKey.All:
        return {}
      case TabKey.New:
        return {new: true}
      case TabKey.Rejected:
        return {statuses: [DealOfferStatus.Rejected]}
      case TabKey.Familiar:
        return {}
      default:
        return {}

    }
  }
  const reFetch = (tab: TabKey) => {

    dealOfferListOwnerContext.setFilter(convertTabKeyToFilter(tab))
    dealOfferListOwnerContext.reFetch()

  }
  const setRoute = (tab: TabKey) => {
    router.replace('/lk/sale-requests/[id]', `${Routes.lkSaleRequest(saleRequestId)}?${queryString.stringify({type: tab !== TabKey.All ? tab : null}, {skipNull: true})}`, {shallow: true})

  }
  const handleChangeTab = (tab: TabKey) => {
    setTab(tab)
    setRoute(tab)
  }
  const handleScrollNext = () => {
    dealOfferListOwnerContext.fetchMore()
  }
  if (!saleRequestOwnerContext.saleRequest && saleRequestOwnerContext.loading) {
    return <ContentLoader style={'fullscreen'} isOpen={true}/>
  }
  return (
    <div className={styles.root}>
      <Tabs<TabKey> options={tabs} value={tab} styleType={'outlined'} onClick={handleChangeTab}/>
      <div className={styles.container}>
        <div className={styles.colLeft}>
          <InfiniteScroll
            dataLength={dealOfferListOwnerContext.data.data.length}
            next={handleScrollNext}
            style={{overflow: 'inherit'}}
            loader={dealOfferListOwnerContext.data.total > 0 ?
              <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
            hasMore={dealOfferListOwnerContext.data.total > dealOfferListOwnerContext.data.data.length}
            scrollThreshold={0.6}>
            <div className={styles.list}>
              {dealOfferListOwnerContext.data.data.map((i) =>
                <SaleRequestDealOfferCard key={i.id} dealOffer={i}/>)}
            </div>
          </InfiniteScroll>
        </div>
        <div className={styles.colRight}>
          <SaleRequestDetailsCard/>
        </div>
      </div>
    </div>
  )
}

export default function SaleRequestPage(props: Props) {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  return (<ClientOnly>
    <Layout>
      <SaleRequestOwnerWrapper saleRequestId={id}>
        <DealOfferListOwnerWrapper saleRequestId={id}>
          <SaleRequestPageInner/>
        </DealOfferListOwnerWrapper>
      </SaleRequestOwnerWrapper>
    </Layout>
  </ClientOnly>)
}

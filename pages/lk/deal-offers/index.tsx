import Select from '@/components/fields/Select'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import {useEffect, useMemo, useState} from 'react'
import SaleRequestCard from '@/components/for_pages/scrap-for-sale/SaleRequestCard'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import queryString from 'query-string'
import MySaleRequestCard from '@/components/for_pages/my-sale-requests/MySaleRequestCard'
import {DealOfferListOwnerWrapper, useDealOfferListOwnerContext} from '@/context/deal_offers_list_owner_state'
import {
  SaleRequestListFromSellerWrapper,
  useSaleRequestListFromSellerContext
} from '@/context/sale_request_list_from_seller_state'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {IOption} from '@/types/types'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import ContentLoader from '@/components/ui/ContentLoader'
import Tabs from '@/components/ui/Tabs'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'

enum TabKey {
  All = 'all',
  Applied = 'applied',
  Accepted = 'accepted',
  Rejected = 'rejected',
  FromSellers = 'fromSellers'
}

interface Props {

}

const LkDealOffersPageInner = (props: Props) => {
  const router = useRouter()
  const dealOfferListOwnerContext = useDealOfferListOwnerContext()
  const saleRequestFromSellerListContext = useSaleRequestListFromSellerContext()
  const receivingPointListContext = useReceivingPointListContext()
  const [receivingPointId, setReceivingPointId] = useState<number | null>(null)
  const [tab, setTab] = useState<TabKey>(router.query.type as TabKey ?? TabKey.All)


  useEffect(() => {
    console.log('Refetch1')
    reFetch(tab, receivingPointId)
  }, [tab, receivingPointId])

  const convertTabKeyToStatusesFilter = (tab: TabKey): DealOfferStatus[] => {
    switch (tab) {
      case TabKey.All:
        return []
      case TabKey.Applied:

        return [DealOfferStatus.Applied]
      case TabKey.Rejected:
        return [DealOfferStatus.Rejected]
      case TabKey.Accepted:

        return [DealOfferStatus.Accepted]
      default:
        return []

    }
  }
  const reFetch = (tab: TabKey, receivingPointId: number | null) => {
    switch (tab) {
      case TabKey.FromSellers:
        saleRequestFromSellerListContext.setFilter({...(receivingPointId ? {receivingPointId} : {})})
        break
      default:
        dealOfferListOwnerContext.setFilter({...(receivingPointId ? {receivingPointId} : {}), statuses: convertTabKeyToStatusesFilter(tab)})
        break
    }
  }
  const setRoute = (tab: TabKey, receivingPointId: number | null) => {
    router.replace(Routes.lkDealOffers, `${Routes.lkDealOffers}?${queryString.stringify({type: tab !== TabKey.All ? tab : null, receivingPointId}, {skipNull: true})}`, {shallow: true})

  }
  const handleChangeTab = (tab: TabKey) => {
    setTab(tab)
    setRoute(tab, receivingPointId)
  }
  const handleChangeReceivingPoint = (receivingPointId: number | null) => {
    setReceivingPointId(receivingPointId)
    setRoute(tab, receivingPointId)
  }
  const receivingPointOptions: IOption<number | null>[] = [
    {label: 'Все пункты приёма', value: null},
    ...receivingPointListContext.items.map(i => ({label: i.name, value: i.id}))
  ]
  const tabs: IOption<TabKey>[] = [
    {label: 'Все предложения', value: TabKey.All},
    {label: 'На рассмотрении', value: TabKey.Accepted},
    {label: 'Принятые', value: TabKey.Applied},
    {label: 'Отклоненные', value: TabKey.Rejected},
    {label: 'Прямые предложения от продавцов', value: TabKey.FromSellers},
  ]

  const stubData = useMemo<{title: string, text: string}>(() => {
    switch (tab){
      case TabKey.All:
        return {
          title: 'Пока нет предложений',
          text: 'Здесь будут появляется предложения, которые вы сделали продавцам',
        }
      case TabKey.Accepted:
        return {
          title: 'Пока нет принятых предложений',
          text: 'Здесь будут появляется принятые продавцами предложения, которые вы сделали продавцам',
        }
      case TabKey.Rejected:
        return {
          title: 'Пока нет отклоненных предложений',
          text: 'Здесь будут появляется отклоненные продавцами предложения, которые вы сделали продавцам',
        }
      case TabKey.Applied:
        return {
          title: 'Пока нет предложений на рассмотрении',
          text: 'Здесь будут появляется предложения на рассмотренни продавцами, которые вы сделали продавцам',
        }
      case TabKey.FromSellers:
        return {
          title: 'Пока нет предложений от продавцов',
          text: 'Здесь будут появляется предложения вашим пунктам приемам, которые сделали продавцы',
        }
    }
  }, [tab])
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>
            Предложения лома
          </div>
          <Select<number | null> className={styles.select} options={receivingPointOptions} value={receivingPointId}
                                 onChange={(i) => handleChangeReceivingPoint(i ?? null)}/>
        </div>
        <Tabs<TabKey> styleType={'outlined'} separatorStartValue={TabKey.FromSellers} options={tabs} value={tab} onClick={handleChangeTab}/>
        <div className={styles.container}>
          {tab !== TabKey.FromSellers && !dealOfferListOwnerContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
          {tab === TabKey.FromSellers && !saleRequestFromSellerListContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
          {tab !== TabKey.FromSellers && dealOfferListOwnerContext.isLoaded && dealOfferListOwnerContext.data.total === 0 &&
            <EmptyStub title={stubData.title} text={stubData.text} actions={ <Button href={Routes.saleRequests} styleType='large' color='blue'>
              Купить лом
            </Button>}/>}
          {tab === TabKey.FromSellers && saleRequestFromSellerListContext.isLoaded && saleRequestFromSellerListContext.data.total === 0 &&
            <EmptyStub title={stubData.title} text={stubData.text} actions={ <Button href={Routes.saleRequests} styleType='large' color='blue'>
              Купить лом
            </Button>}/>}

          {tab !== TabKey.FromSellers && <InfiniteScroll
            dataLength={dealOfferListOwnerContext.data.data.length}
            next={dealOfferListOwnerContext.fetchMore}
            style={{overflow: 'inherit'}}
            loader={dealOfferListOwnerContext.data.total > 0 ?
              <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
            hasMore={dealOfferListOwnerContext.data.total > dealOfferListOwnerContext.data.data.length}
            scrollThreshold={0.6}>
            <div className={styles.list}>
              {dealOfferListOwnerContext.data.data.map(i =>
                <SaleRequestCard dealOffer={i} item={i.saleRequest as ISaleRequest} key={i.id}/>)}
            </div>
          </InfiniteScroll>}
          {tab === TabKey.FromSellers && <InfiniteScroll
            dataLength={saleRequestFromSellerListContext.data.data.length}
            next={saleRequestFromSellerListContext.fetchMore}
            style={{overflow: 'inherit'}}
            loader={saleRequestFromSellerListContext.data.total > 0 ?
              <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
            hasMore={saleRequestFromSellerListContext.data.total > saleRequestFromSellerListContext.data.data.length}
            scrollThreshold={0.6}>
            <div className={styles.list}>
              {saleRequestFromSellerListContext.data.data.map(i =>
                <MySaleRequestCard mode={'buyer'} item={i} key={i.id}/>)}
            </div>
          </InfiniteScroll>}
        </div>
      </div>
    </Layout>
  )
}


export default function LkDealOffersPage(props: Props) {
  return (<ReceivingPointListWrapper>
    <DealOfferListOwnerWrapper>
      <SaleRequestListFromSellerWrapper>
        <LkDealOffersPageInner/>
      </SaleRequestListFromSellerWrapper>
    </DealOfferListOwnerWrapper>
  </ReceivingPointListWrapper>)
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

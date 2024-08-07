import Select from '@/components/fields/Select'
import styles from './index.module.scss'
import {useEffect, useMemo, useState} from 'react'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import queryString from 'query-string'
import {DealOfferListOwnerWrapper, useDealOfferListOwnerContext} from '@/context/deal_offers_list_owner_state'
import {
  SaleRequestListFromSellerWrapper,
  useSaleRequestListFromSellerContext
} from '@/context/sale_request_list_from_seller_state'
import { useReceivingPointListContext} from '@/context/receiving_point_list_state'
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
import {LkPageBaseLayout} from '@/pages/lk'
import SaleRequestOwnerCard from '@/components/for_pages/Common/Cards/SaleRequestOwnerCard'
import {useNotificationContext} from '@/context/notifications_state'
import {NotificationType} from '@/data/interfaces/INotification'
import {DealOfferOwnerCard} from '@/components/for_pages/Common/Cards/DealOfferOwnerCard'

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
  const notifyContext = useNotificationContext()
  const badgeAccepted = notifyContext.getTotalByTypes([
    NotificationType.DealOfferAccepted,
  ])
  const badgeRejected = notifyContext.getTotalByTypes([
    NotificationType.DealOfferRejected
  ])

  const badgeFromSellers = notifyContext.getTotalByTypes([
    NotificationType.NewSaleRequest
  ])

  useEffect(() => {
    console.log('Refetch1', tab, receivingPointId)
    reFetch(tab, receivingPointId)
  }, [tab, receivingPointId])

  const convertTabKeyToStatusesFilter = (tab: TabKey): DealOfferStatus[] => {
    switch (tab) {
      case TabKey.All:
        return []
      case TabKey.Applied:
        return [DealOfferStatus.Applied]
      case TabKey.Accepted:
        return [DealOfferStatus.Accepted]
      case TabKey.Rejected:
        return [DealOfferStatus.Rejected]
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
    {label: 'На рассмотрении', value: TabKey.Applied},
    {label: 'Принятые', value: TabKey.Accepted, badge: badgeAccepted},
    {label: 'Отклоненные', value: TabKey.Rejected, badge: badgeRejected},
    {label: 'Прямые предложения от продавцов', value: TabKey.FromSellers, badge: badgeFromSellers},
  ]

  const stubData = useMemo<{title: string, text: string}>(() => {
    switch (tab){
      case TabKey.All:
        return {
          title: 'Пока нет предложений',
          text: 'Здесь будут появляется предложения, которые вы сделали продавцам',
        }
      case TabKey.Applied:
        return {
          title: 'Пока нет предложений на рассмотрении',
          text: 'Здесь будут появляется предложения на рассмотренни продавцами, которые вы сделали продавцам',
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
      case TabKey.FromSellers:
        return {
          title: 'Пока нет предложений от продавцов',
          text: 'Здесь будут появляется предложения вашим пунктам приемам, которые сделали продавцы',
        }
    }
  }, [tab])
  return (
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
                <DealOfferOwnerCard dealOffer={i} saleRequest={i.saleRequest as ISaleRequest} key={i.id}/>)}
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
                <SaleRequestOwnerCard mode={'buyer'} item={i} key={i.id}/>)}
            </div>
          </InfiniteScroll>}
        </div>
      </div>
  )
}


const LkDealOffersPage = (props: Props) => {
  return (<DealOfferListOwnerWrapper>
      <SaleRequestListFromSellerWrapper>
        <LkDealOffersPageInner/>
      </SaleRequestListFromSellerWrapper>
    </DealOfferListOwnerWrapper>)
}
LkDealOffersPage.getLayout = LkPageBaseLayout
export default LkDealOffersPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

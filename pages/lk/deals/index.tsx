import styles from 'pages/lk/sale-requests/index.module.scss'
import {useEffect, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import Tabs from '@/components/ui/Tabs'
import {IOption} from '@/types/types'
import {getAuthServerSideProps} from '@/utils/auth'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
import {DealListOwnerWrapper, IDealFilter, useDealListOwnerContext} from '@/context/deal_list_state'
import {DealStatus} from '@/data/enum/DealStatus'
import DealCard from '@/components/for_pages/Common/Cards/DealCard'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'
import {LkPageBaseLayout} from '@/pages/lk'

enum TabKey {
  Active = 'active',
  Completed = 'completed',
  Terminated = 'terminated',
}

interface Props {

}

const LkDealsPageInner = (props: Props) => {
  const appContext = useAppContext()
  const dealListOwnerContext = useDealListOwnerContext()
  const router = useRouter()
  const [tab, setTab] = useState<TabKey>(router.query?.active as TabKey ?? TabKey.Active)
  const getFilterByTab = (tab: TabKey): IDealFilter => {
    switch (tab){
      case TabKey.Active:
        return {statuses: [DealStatus.New, DealStatus.SetUp, DealStatus.Weighing, DealStatus.WeighingAccepted]}
      case TabKey.Completed:
        return {statuses: [DealStatus.Paid]}
      case TabKey.Terminated:
        return {statuses: [DealStatus.TerminatedBySeller, DealStatus.TerminatedByBuyer]}
    }
  }

  const handleChangeTab = (tab: TabKey) => {
    setTab(tab)
    dealListOwnerContext.setFilter(getFilterByTab(tab))
  }
  const tabs: IOption<TabKey>[] = [
    {label: 'Активные', value: TabKey.Active},
    {label: 'Завершенные', value: TabKey.Completed},
    {label: 'Расторгнутые', value: TabKey.Terminated},
  ]
  useEffect(() => {
    dealListOwnerContext.reFetch()
  }, [])


  const stubData = useMemo<{title: string, text: string}>(() => {
    switch (tab){
      case TabKey.Active:
        return {
          title: 'Пока нет активных сделок',
          text: 'Здесь будут появляется сделки после того как вы одобрите предлложение продавца на продажу лома или предложите сделку пункту приема',
        }
      case TabKey.Completed:
        return {
          title: 'Пока нет завершенных сделок',
          text: 'Здесь будут появляется принятые продавцами предложения, которые вы сделали продавцам',
        }
      case TabKey.Terminated:
        return {
          title: 'Пока нет расторгнутых сделок',
          text: 'Здесь будут появляется расторгнутые сделки',
        }
    }
  }, [tab])

  return (
      <div className={styles.root}>
        <div className={styles.title}>
         Сделки
        </div>
        <Tabs<TabKey> options={tabs} value={tab} styleType={'outlined'} onClick={handleChangeTab}/>
        {!dealListOwnerContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
        {dealListOwnerContext.isLoaded && dealListOwnerContext.data.total === 0 &&
          <EmptyStub title={stubData.title} text={stubData.text} actions={ appContext.aboutMe?.role === UserRole.Seller ? <Button href={Routes.lkSaleRequestCreate} styleType='large' color='blue'>
            Продать лом
          </Button> : <Button href={Routes.saleRequests} styleType='large' color='blue'>
            Купить лом
          </Button>}/>}
        <InfiniteScroll
          dataLength={dealListOwnerContext.data.data.length}
          next={dealListOwnerContext.fetchMore}
          style={{overflow: 'inherit'}}
          loader={dealListOwnerContext.data.total > 0 ?
            <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={dealListOwnerContext.data.total > dealListOwnerContext.data.data.length}
          scrollThreshold={0.6}>
          <div className={styles.list}>
            {dealListOwnerContext.data.data.map((i, index) =>
              <DealCard mode={appContext.aboutMe?.role === UserRole.Seller ? 'seller' : 'buyer'} deal={i} key={i.id}/>
            )}
          </div>
        </InfiniteScroll>
      </div>
  )
}
const LkDealsPage = (props: Props) => {
  return <DealListOwnerWrapper>
    <LkDealsPageInner/>
  </DealListOwnerWrapper>
}
LkDealsPage.getLayout = LkPageBaseLayout
export default  LkDealsPage
export const getServerSideProps = getAuthServerSideProps()

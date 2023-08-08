import Layout from '@/components/layout/Layout'
import styles from 'pages/lk/sale-requests/index.module.scss'
import {useState} from 'react'
import MySaleRequestCard from '@/components/for_pages/my-sale-requests/MySaleRequestCard'
import {SaleRequestListOwnerWrapper, useSaleRequestListOwnerContext} from '@/context/sale_request_list_owner_state'
import {useRouter} from 'next/router'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'
import Tabs from '@/components/ui/Tabs'
import {IOption} from '@/types/types'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'

enum TabType {
  Active = 'active',
  Completed = 'completed'
}

interface Props {

}

const LkSalesRequestsPageInner = (props: Props) => {
  const saleRequestListOwnerContext = useSaleRequestListOwnerContext()
  const router = useRouter()
  const [tab, setTab] = useState<TabType>(router.query?.active as TabType ?? TabType.Active)
  const handleChangeTab = (tab) => {
    setTab(tab)
    saleRequestListOwnerContext.setFilter({...(tab === TabType.Active ? {statuses: [SaleRequestStatus.Draft, SaleRequestStatus.Published]} : {statuses: [SaleRequestStatus.Completed]})})
  }
  const tabs: IOption<TabType>[] = [
    {label: 'Активные', value: TabType.Active},
    {label: ' Завершенные', value: TabType.Completed},
  ]

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Мои заявки на продажу
        </div>
        <Tabs<TabType> options={tabs} value={tab} styleType={'outlined'} onClick={handleChangeTab}/>
        <div className={styles.list}>
          {saleRequestListOwnerContext.data.data.map((i, index) =>
            <MySaleRequestCard number={1} item={i} key={i.id}/>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default function LkSalesRequestsPage(props: Props) {
  return <SaleRequestListOwnerWrapper>
    <LkSalesRequestsPageInner/>
  </SaleRequestListOwnerWrapper>
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)

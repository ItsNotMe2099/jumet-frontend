import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useRouter } from 'next/router'
import LkLayout from '@/components/for_pages/LkPage/layout'
import LkMenuBuyer from '@/components/for_pages/LkPage/layout/LkMenuBuyer'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import ReceivingPointCard from '@/components/for_pages/LkPage/Cards/ReceivingPointCard'

interface Props {

}

const ReceivingPointsPageWrapper = (props: Props) => {
  const router = useRouter()
  const receivingPointListContext = useReceivingPointListContext()
  console.log('receivingPointListContext.items', receivingPointListContext.items)
  return (
      <LkLayout menu={<LkMenuBuyer receivingPoints={receivingPointListContext.items}/>}>
        {receivingPointListContext.items.map((i, index) =>
          <ReceivingPointCard item={i} key={i.id} href={`${router.asPath}/${i.id}/info`} />
        )}
      </LkLayout>
  )
}

export default function ReceivingPointsPage(){
  return (  <Layout><ReceivingPointListWrapper>
    <ReceivingPointsPageWrapper/>
  </ReceivingPointListWrapper></Layout>)
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

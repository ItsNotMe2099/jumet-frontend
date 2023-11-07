import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { GetServerSideProps } from 'next'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import {CookiesType} from '@/types/enums'
import SaleRequestInfoPageCard from '@/components/for_pages/sale-request/SaleRequestInfoPageCard'
import SaleRequestAddressPageCard from '@/components/for_pages/sale-request/SaleRequestAddressPageCard'
import SaleRequestPhotosPageCard from '@/components/for_pages/sale-request/SaleRequestPhotosPageCard'
import {useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {UserRole} from '@/data/enum/UserRole'
import {useAppContext} from '@/context/state'

interface Props {
  saleRequest: ISaleRequest
}


export default function SaleRequestPage({ saleRequest }: Props) {
  const appContext = useAppContext()
  const receivingPointListContext = useReceivingPointListContext()
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.colLeft}>
          <SaleRequestInfoPageCard item={saleRequest} />
          <SaleRequestAddressPageCard item={saleRequest}/>
          <SaleRequestPhotosPageCard item={saleRequest}/>
        </div>
        {appContext.aboutMe?.role !== UserRole.Seller ? <ChatOnPage title={'Чат с покупателем'}  sellerId={saleRequest.ownerId} receivingPointId={receivingPointListContext.currentReceivingPoint?.id}/> : null}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.query.id as string, 10)
  const token = context.req.cookies[CookiesType.accessToken]
  try {

    const saleRequest = await SaleRequestRepository.fetchById(+id, token)
    if(!saleRequest){
      return {notFound: true} as  { notFound: true }
    }
    return {
      props: {
        saleRequest
      }
    }
  }catch (e) {
    console.error(e)
    return {notFound: true} as  { notFound: true }
  }
}

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { GetServerSideProps } from 'next'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import SaleRequestCardForBuyer from '@/components/for_pages/Common/SaleRequestComponents/Cards/SaleRequestCardForBuyer'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import SaleRequestAddressCard from '@/components/for_pages/Common/SaleRequestComponents/Cards/SaleRequestAddressCard'
import {CookiesType} from '@/types/enums'
import SaleRequestPhotosCard from '@/components/for_pages/Common/SaleRequestComponents/Cards/SaleRequestPhotosCard'

interface Props {
  saleRequest: ISaleRequest
}


export default function SaleRequestPage({ saleRequest }: Props) {
  console.log('saleRequest', saleRequest)
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.colLeft}>
          <SaleRequestCardForBuyer item={saleRequest} />
          <SaleRequestAddressCard item={saleRequest}/>
          <SaleRequestPhotosCard item={saleRequest}/>
        </div>

        <ChatOnPage/>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.query.id as string, 10)
  const token = context.req.cookies[CookiesType.accessToken]
  try {

    const saleRequest = await SaleRequestRepository.fetchById(+id, token)
    return {
      props: {
        saleRequest
      }
    }
  }catch (e) {
    console.error(e)
    return {
      notFound: true,
      props: {}
    }
  }
}

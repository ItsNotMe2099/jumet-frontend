import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { GetServerSideProps } from 'next'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import SaleRequestCardForBuyer from '@/components/for_pages/Common/SaleRequestComponents/Cards/SaleRequestCardForBuyer'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import SaleRequestAddressCard from '@/components/for_pages/Common/SaleRequestComponents/Cards/SaleRequestAddressCard'

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
        </div>

        <ChatOnPage/>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id
  try {

    const saleRequest = await SaleRequestRepository.fetchById(+id)
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

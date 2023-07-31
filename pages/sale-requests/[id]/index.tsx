import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { GetServerSideProps } from 'next'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import AddressCard from '@/components/for_pages/Common/SaleRequestComponents/Cards/AddressCard'
import SaleRequestCardForBuyer from '@/components/for_pages/Common/SaleRequestComponents/Cards/SaleRequestCardForBuyer'
import Chat from '@/components/for_pages/Common/ReceivingPointComponents/Chat'
import { useState } from 'react'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import { colors } from '@/styles/variables'
import TabBar from '@/components/for_pages/receiving-point/Tabbar'

interface Props {
  saleRequest: ISaleRequest
}


export default function SaleRequestPage({ saleRequest }: Props) {

  const [showChat, setShowChat] = useState<boolean>(false)

  return (
    <Layout>
      <div className={styles.root}>
        {!showChat ? <div className={styles.content}>
          <SaleRequestCardForBuyer item={saleRequest} />
          <AddressCard cardLayoutTitleClass={styles.layoutTitle} item={saleRequest} />
        </div>
          :
          <div className={styles.chatLayout}>
            <div className={styles.header}>
              <div className={styles.back} onClick={() => setShowChat(false)}>
                <ChevronLeftSvg color={colors.grey500} />
                <div className={styles.text}>Назад</div>
              </div>
            </div>
            <Chat className={styles.chatMobile} messageClass={styles.message} />
          </div>
        }
        <Chat className={styles.chat} messageClass={styles.message} />
      </div>
      {!showChat && <TabBar onClick={() => setShowChat(true)} isSticky />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const id = context.query?.id

  // Fetch data only if 'id' is present and is a number
  if (id && typeof id === 'string') {
    const res = await SaleRequestRepository.searchById(+id)

    return {
      props: {
        saleRequest: res.data[0] // Assuming res contains the fetched data
      }
    }
  }

  // If 'id' is not present or is not a number, return an empty object
  return {
    props: {}
  }
}
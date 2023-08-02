import {GetServerSideProps} from 'next'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointRepository from '@/data/repositories/ReceivingPointRepository'
import styles from './index.module.scss'
import {useState} from 'react'
import ContactsViewCard from '@/components/for_pages/ReceivingPoint/Cards/ContactsViewCard'
import AddressViewCard from '@/components/for_pages/ReceivingPoint/Cards/AddressViewCard'
import PricesViewCard from '@/components/for_pages/ReceivingPoint/Cards/PricesViewCard'
import DeliveryZonesViewCard from '@/components/for_pages/ReceivingPoint/Cards/DeliveryZonesViewCard'
import WorkingHoursViewCard from '@/components/for_pages/ReceivingPoint/Cards/WorkingHoursViewCard'
import CompanyViewCard from '@/components/for_pages/ReceivingPoint/Cards/CompanyViewCard'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import {colors} from '@/styles/variables'
import Chat from '@/components/for_pages/Common/ReceivingPoint/Chat'
import TabBar from '@/components/for_pages/ReceivingPoint/Tabbar'
import Layout from '@/components/layout/Layout'
import ReviewsViewCard from '@/components/for_pages/ReceivingPoint/Cards/ReviewsCard'

interface Props {
  receivingPoint: IReceivingPoint;
}

export default function ReceivingPoint(props: Props) {
  const receivingPoint = props.receivingPoint
  const [showChat, setShowChat] = useState<boolean>(false)
  return (
    <Layout>
      <div className={styles.root}>
        {!showChat ? <div className={styles.content}>
            <ContactsViewCard receivingPoint={receivingPoint}/>
            <AddressViewCard receivingPoint={receivingPoint}/>
            <PricesViewCard receivingPoint={receivingPoint}/>
            <DeliveryZonesViewCard receivingPoint={receivingPoint}/>
            <ReviewsViewCard receivingPoint={receivingPoint} />
            <WorkingHoursViewCard receivingPoint={receivingPoint}/>
            <CompanyViewCard receivingPoint={receivingPoint}/>
          </div>
          :
          <div className={styles.chatLayout}>
            <div className={styles.header}>
              <div className={styles.back} onClick={() => setShowChat(false)}>
                <ChevronLeftSvg color={colors.grey500}/>
                <div className={styles.text}>Назад</div>
              </div>
            </div>
            <Chat address={receivingPoint.address?.address} className={styles.chatMobile}
                  messageClass={styles.message}/>
          </div>
        }
        <Chat className={styles.chat} messageClass={styles.message}/>
      </div>
      {!showChat && <TabBar onClick={() => setShowChat(true)} isSticky/>}
    </Layout>
  )


}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const id = parseInt(context.query?.slug as string, 10)
  try {
    const receivingPoint = await ReceivingPointRepository.fetchById(id)
    return {
      props: {
        receivingPoint,
      } as Props
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true
    }
  }

}

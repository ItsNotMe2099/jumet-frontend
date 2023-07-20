import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import ContactsCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/ContactsCard'
import { GetServerSideProps } from 'next'
import IPointData from '@/data/interfaces/IPointData'
import AddressCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/AddressCard'
import DeliveryZonesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/DeliveryZonesCard'
import CostCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/CostCard'
import { points } from '@/data/temp/points'
import ReviewsCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/ReviewsCard'
import WorkingHoursCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/WorkingHoursCard'
//import PhotosCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/PhotosCard'
import RequisitesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/RequisitesCard'
import Chat from '@/components/for_pages/Common/ReceivingPointComponents/Chat'
import TabBar from '@/components/for_pages/receiving-point/Tabbar'
import { useState } from 'react'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import { colors } from '@/styles/variables'
import classNames from 'classnames'

interface Props {
  item: IPointData
}

export default function ReceivingPoint(props: Props) {

  const [showChat, setShowChat] = useState<boolean>(false)

  return (
    <Layout>
      <div className={styles.root}>
        {!showChat ? <div className={styles.content}>
          <ContactsCard cardLayoutTitleClass={classNames(styles.layoutTitle, styles.mobileCardTitle)} item={props.item} />
          <AddressCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <CostCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <DeliveryZonesCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <ReviewsCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <WorkingHoursCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          {/*<PhotosCard  item={props.item} />*/}
          <RequisitesCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
        </div>
          :
          <div className={styles.chatLayout}>
            <div className={styles.header}>
              <div className={styles.back} onClick={() => setShowChat(false)}>
                <ChevronLeftSvg color={colors.grey500} />
                <div className={styles.text}>Назад</div>
              </div>
            </div>
            <Chat address={props.item.address} className={styles.chatMobile} messageClass={styles.message} />
          </div>
        }
        <Chat className={styles.chat} messageClass={styles.message} />
      </div>
      {!showChat && <TabBar onClick={() => setShowChat(true)} isSticky />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = context.query.slug as string

  const data = points

  return {
    props: {
      item: data.data.find(i => i.id === +res)
    } as Props
  }
}

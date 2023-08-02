import AddressCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/AddressCard'
import ContactsCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/ContactsCard'
import CostCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/CostCard'
import DeliveryZonesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/DeliveryZonesCard'
import RequisitesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/RequisitesCard'
import ReviewsCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/ReviewsCard'
import WorkingHoursCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/WorkingHoursCard'
import Layout from '@/components/layout/Layout'
import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import Chat from '@/components/for_pages/Common/ReceivingPointComponents/Chat'
import TabBar from '@/components/for_pages/receiving-point/Tabbar'
import { colors } from '@/styles/variables'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import ReceivingPointRepository from '@/data/repositories/ReceivingPointRepository'

interface Props {
  item: IReceivingPoint
}

export default function ReceivingPoint(props: Props) {

  const [showChat, setShowChat] = useState<boolean>(false)

  //return null

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
            <Chat address={props.item.address.address as string} className={styles.chatMobile} messageClass={styles.message} />
          </div>
        }
        <Chat className={styles.chat} messageClass={styles.message} />
      </div>
      {!showChat && <TabBar onClick={() => setShowChat(true)} isSticky />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const id = context.query?.slug as string

  // Fetch data only if 'id' is present and is a number
  const res = await ReceivingPointRepository.searchById(+id)

  return {
    props: {
      item: res // Assuming res contains the fetched data
    }
  }
}
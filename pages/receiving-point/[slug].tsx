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
import PhotosCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/PhotosCard'
import RequisitesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/RequisitesCard'
import Chat from '@/components/for_pages/Common/ReceivingPointComponents/Chat'

interface Props {
  item: IPointData
}

export default function ReceivingPoint(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.content}>
          <ContactsCard  item={props.item} />
          <AddressCard  item={props.item} />
          <CostCard  item={props.item} />
          <DeliveryZonesCard  item={props.item} />
          <ReviewsCard  item={props.item} />
          <WorkingHoursCard  item={props.item} />
          <PhotosCard  item={props.item} />
          <RequisitesCard  item={props.item} />
        </div>
        <Chat className={styles.chat} messageClass={styles.message} />
      </div>
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

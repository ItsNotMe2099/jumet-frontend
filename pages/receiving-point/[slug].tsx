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
import Layout from '@/components/layout/Layout'
import ReviewsViewCard from '@/components/for_pages/ReceivingPoint/Cards/ReviewsCard'
import {useAppContext} from '@/context/state'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import PhotosViewCard from '@/components/for_pages/ReceivingPoint/Cards/PhotosViewCard'
import {UserRole} from '@/data/enum/UserRole'
import ClientOnly from '@/components/visibility/ClientOnly'

interface Props {
  receivingPoint: IReceivingPoint;
}

export default function ReceivingPoint(props: Props) {
  const appContext = useAppContext()
  const receivingPoint = props.receivingPoint
  const [showChat, setShowChat] = useState<boolean>(false)

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.colLeft}>
          <ContactsViewCard receivingPoint={receivingPoint}/>
          <AddressViewCard receivingPoint={receivingPoint}/>
          <PricesViewCard receivingPoint={receivingPoint}/>
          <DeliveryZonesViewCard receivingPoint={receivingPoint}/>
          <ReviewsViewCard receivingPoint={receivingPoint}/>
          <WorkingHoursViewCard receivingPoint={receivingPoint}/>
          <PhotosViewCard receivingPoint={receivingPoint}/>
          <CompanyViewCard receivingPoint={receivingPoint}/>
        </div>
        <ClientOnly>
        {appContext.aboutMe?.role !== UserRole.Buyer ? <ChatOnPage title={'Чат с пунктом приема'} sellerId={appContext.aboutMe?.id} receivingPointId={receivingPoint?.id}/> : null}
        </ClientOnly>
      </div>
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

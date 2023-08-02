import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'
import LkLayout from '@/components/for_pages/LkPage/layout'
import AddressCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/AddressLkCard'
import CostCardLk from '@/components/for_pages/LkPage/ReceivingPoint/Cards/PricesLkCard'
import DeliveryZonesCardLk from '@/components/for_pages/LkPage/ReceivingPoint/Cards/DeliveryZonesLkCard'
import EmployeesCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/EmployeesLkCard'
import WorkingHoursCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/WorkingHoursLkCard'
import PhotosCardLk from '@/components/for_pages/LkPage/ReceivingPoint/Cards/PhotosLkCard'
import CompanyLkCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/CompanyLkCard'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {ReceivingPointOwnerWrapper} from '@/context/receiving_point_owner_state'
import LkMenuBuyer from '@/components/for_pages/LkPage/layout/LkMenuBuyer'

interface Props {
}

const ReceivingPointInfoPageWrapper = (props: Props) => {

  const router = useRouter()
  const receivingPointListContext = useReceivingPointListContext()
  return (
    <LkLayout menu={<LkMenuBuyer receivingPoints={receivingPointListContext.items}/>}>
      <AddressCard/>
      <DeliveryZonesCardLk/>
      <CostCardLk/>
      <WorkingHoursCard/>
      <PhotosCardLk/>
      <CompanyLkCard/>
      <EmployeesCard/>
    </LkLayout>
  )
}
export default function ReceivingPointInfoPage(props: Props) {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  return (<Layout>
    <ReceivingPointListWrapper>
      <ReceivingPointOwnerWrapper receivingPointId={id}>
        <ReceivingPointInfoPageWrapper/>
      </ReceivingPointOwnerWrapper>
    </ReceivingPointListWrapper>
  </Layout>)
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

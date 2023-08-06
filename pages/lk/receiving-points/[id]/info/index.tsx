import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import AddressCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/AddressLkCard'
import DeliveryZonesCardLk from '@/components/for_pages/LkPage/ReceivingPoint/Cards/DeliveryZonesLkCard'
import CostCardLk from '@/components/for_pages/LkPage/ReceivingPoint/Cards/PricesLkCard'
import WorkingHoursCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/WorkingHoursLkCard'
import PhotosCardLk from '@/components/for_pages/LkPage/ReceivingPoint/Cards/PhotosLkCard'
import CompanyLkCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/CompanyLkCard'
import EmployeesCard from '@/components/for_pages/LkPage/ReceivingPoint/Cards/EmployeesLkCard'
import { LkReceivingPageLayout} from '@/pages/lk'
import CardLayoutList from '@/components/for_pages/Common/CardLayoutList'

interface Props {
}

const ReceivingPointInfoPage = (props: Props) => {

  return (
    <CardLayoutList>
      <AddressCard/>
      <DeliveryZonesCardLk/>
      <CostCardLk/>
      <WorkingHoursCard/>
      <PhotosCardLk/>
      <CompanyLkCard/>
      <EmployeesCard/>
    </CardLayoutList>)
}
ReceivingPointInfoPage.getLayout = LkReceivingPageLayout
export default ReceivingPointInfoPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

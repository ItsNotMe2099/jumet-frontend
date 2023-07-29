import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'
import AddressCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/AddressCard'
import IPointData from '@/data/interfaces/IPointData'
import Button from '@/components/ui/Button'
import EditSvg from '@/components/svg/EditSvg'
import { colors } from '@/styles/variables'
import CostCardLk from '@/components/for_pages/Common/ReceivingPointComponents/Cards/CostCardLk'
import DeliveryZonesCardLk from '@/components/for_pages/Common/ReceivingPointComponents/Cards/DeliveryZonesCardLk'
import EmployeesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/EmployeesCard'
import PlusSvg from '@/components/svg/PlusSvg'
import WorkingHoursCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/WorkingHoursCard'
import PhotosCardLk from '@/components/for_pages/Common/ReceivingPointComponents/Cards/PhotosCardLk'
import RequisitesCard from '@/components/for_pages/Common/ReceivingPointComponents/Cards/RequisitesCard'

interface Props {
  item: IPointData
}

export default function ReceivingPointInfoPage({ item }: Props) {

  const router = useRouter()

  const token = Cookies.get('accessToken')



  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  return (
    <Layout>
      <LkLayout className={styles.desktop} >
        <AddressCard item={item} additionalEl={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать данные
          </Button>} topClassName={styles.top} />
        <DeliveryZonesCardLk item={item} additionalEl={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <CostCardLk item={item} additionalEl={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <WorkingHoursCard item={item} additionalEl={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <PhotosCardLk item={item} />
        <RequisitesCard item={item} additionalEl={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <EmployeesCard item={item} additionalEl={
          <div className={styles.btns}>
            <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
              Редактировать
            </Button>
            <Button className={styles.btnSecond} color='blue' styleType='large' icon={<PlusSvg color={colors.white} />}>
              Добавить
            </Button>
          </div>} topClassName={styles.top} />
      </LkLayout>

      {/* <LkLayoutMobile point={item}>
        <AddressCard
          button={<Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>}
          cardLayoutClass={styles.mobileCard}
          item={item}
          topClassName={styles.top} />
        <DeliveryZonesCardLk cardLayoutClass={styles.mobileCard} item={item}
          button={<Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <CostCardLk cardLayoutClass={styles.mobileCard} item={item} button={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <WorkingHoursCard cardLayoutClass={styles.mobileCard} item={item} button={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <PhotosCardLk cardLayoutClass={styles.mobileCard} item={item} />
        <RequisitesCard cardLayoutClass={styles.mobileCard} item={item} button={
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать
          </Button>} topClassName={styles.top} />
        <EmployeesCard cardLayoutClass={styles.mobileCard} item={item} button={
          <div className={styles.btns}>
            <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
              Редактировать
            </Button>
            <Button className={styles.btnSecond} color='blue' styleType='large' icon={<PlusSvg color={colors.white} />}>
              Добавить
            </Button>
          </div>} topClassName={styles.top} />
      </LkLayoutMobile>*/}
    </Layout>
  )
}

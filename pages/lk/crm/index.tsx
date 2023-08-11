import { useRouter } from 'next/router'
import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkReceivingPageLayout } from '@/pages/lk'
import DatesPanel from '@/components/for_pages/LkPage/layout/LkStatsMenu/DatesPanel'
import styles from './index.module.scss'
import Donut from '@/components/for_pages/LkPage/layout/LkStatsMenu/Donut'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import Button from '@/components/ui/Button'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import { colors } from '@/styles/variables'

interface Props {

}

const StatisticPage = (props: Props) => {

  const router = useRouter()

  return (
    <div className={styles.root}>
      <DatesPanel />
      <CardLayout title='Сделки' 
      topClassName={styles.top}
      additionalEl=
        {<Button reverse styleType='large' color='grey' icon={<ChevronRightSvg color={colors.blue500} />}>Детали</Button>}>
        <Donut
          className={styles.donut}
          total={64}
          canceled={4}
          completed={50}
          inProgress={10}
          totalCost={2213271}
          canceledCost={13000}
          completedCost={1000271}
          inProgressCost={200000}
        />
      </CardLayout>
    </div>
  )
}
StatisticPage.getLayout = LkReceivingPageLayout
export default StatisticPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

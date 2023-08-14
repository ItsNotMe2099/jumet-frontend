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
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import { useState, useEffect } from 'react'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import ProgressBar from '@ramonak/react-progress-bar'
import classNames from 'classnames'
import ColoredCircleSvg from '@/components/svg/ColoredCircleSvg'

interface Props {

}

const StatisticPage = (props: Props) => {

  const [points, setPoints] = useState<IReceivingPoint[]>([])

  const fetchReceivingPoints = async () => {
    await ReceivingPointOwnerRepository.fetch().then(data => {
      if (data) {
        setPoints(data)
      }
    })
  }

  useEffect(() => {
    fetchReceivingPoints()
  }, [])

  const dealsCurrentPeriod = 58
  const dealsPrevPeriod = 54

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
      {points.map((i, index) =>
        <CardLayout title={i.address.address as string}
          key={index}
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
          <div className={styles.first}>
            <div className={styles.label}>
              Отклики по заявкам
            </div>
            <div className={styles.line}>
              <ProgressBar
                className={styles.progress}
                completed={dealsCurrentPeriod >= dealsPrevPeriod ? 100 : (dealsCurrentPeriod / dealsPrevPeriod) * 100}
                isLabelVisible={false}
                bgColor={dealsCurrentPeriod >= dealsPrevPeriod ? colors.blue500 : colors.blue300}
                baseBgColor="transparent"
                height="8px"
                borderRadius="2px" />
              <div className={styles.number}>
                {dealsCurrentPeriod}
              </div>
            </div>
            <div className={styles.line}>
              <ProgressBar
                className={styles.progress}
                completed={dealsPrevPeriod >= dealsCurrentPeriod ? 100 : (dealsPrevPeriod / dealsCurrentPeriod) * 100}
                isLabelVisible={false}
                bgColor={dealsPrevPeriod >= dealsCurrentPeriod ? colors.blue500 : colors.blue300}
                baseBgColor="transparent"
                height="8px"
                borderRadius="2px" />
              <div className={classNames(styles.number, { [styles.less]: dealsPrevPeriod < dealsCurrentPeriod })}>
                {dealsPrevPeriod}
              </div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.label}>
              Прямые предложения купить лом
            </div>
            <div className={styles.line}>
              <ProgressBar
                className={styles.progress}
                completed={dealsCurrentPeriod >= dealsPrevPeriod ? 100 : (dealsCurrentPeriod / dealsPrevPeriod) * 100}
                isLabelVisible={false}
                bgColor={dealsCurrentPeriod >= dealsPrevPeriod ? colors.blue500 : colors.blue300}
                baseBgColor="transparent"
                height="8px"
                borderRadius="2px" />
              <div className={styles.number}>
                {dealsCurrentPeriod}
              </div>
            </div>
            <div className={styles.line}>
              <ProgressBar
                className={styles.progress}
                completed={dealsPrevPeriod >= dealsCurrentPeriod ? 100 : (dealsPrevPeriod / dealsCurrentPeriod) * 100}
                isLabelVisible={false}
                bgColor={dealsPrevPeriod >= dealsCurrentPeriod ? colors.blue500 : colors.blue300}
                baseBgColor="transparent"
                height="8px"
                borderRadius="2px" />
              <div className={classNames(styles.number, { [styles.less]: dealsPrevPeriod < dealsCurrentPeriod })}>
                {dealsPrevPeriod}
              </div>
            </div>
          </div>
          <div className={styles.legend}>
            <div className={styles.item}>
              <ColoredCircleSvg color={dealsCurrentPeriod >= dealsPrevPeriod ? colors.blue500 : colors.blue300} />
              <div className={styles.text}>За выбранный период</div>
            </div>
            <div className={styles.item}>
              <ColoredCircleSvg color={dealsPrevPeriod >= dealsCurrentPeriod ? colors.blue500 : colors.blue300} />
              <div className={styles.text}>За предыдущий период</div>
            </div>
          </div>
        </CardLayout>
      )
      }
    </div >
  )
}
StatisticPage.getLayout = LkReceivingPageLayout
export default StatisticPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

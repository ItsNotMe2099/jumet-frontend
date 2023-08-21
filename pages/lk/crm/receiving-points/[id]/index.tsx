import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkPageLayout } from '@/pages/lk'
import DatesPanel from '@/components/for_pages/LkPage/crm/components/DatesPanel'
import styles from './index.module.scss'
import Donut from '@/components/for_pages/LkPage/crm/components/Donut'
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
import VisibleXs from '@/components/visibility/VisibleXs'
import { LkLayoutTitleData } from '@/context/lk_layout_content'
import { useRouter } from 'next/router'
import PricingTable from '@/components/for_pages/Common/PricingTable'
import LineChart from '@/components/for_pages/LkPage/crm/components/LineChart'

interface Props {
  id: number
}

const StatisticReceivingPointPage = (props: Props) => {

  const [point, setPoint] = useState<IReceivingPoint | null>(null)

  const router = useRouter()

  const fetchReceivingPoint = async () => {
    if (router.query.id) {
      await ReceivingPointOwnerRepository.fetchById(+router.query.id as number).then(data => {
        if (data) {
          setPoint(data)
        }
      })
    }
  }

  useEffect(() => {
    fetchReceivingPoint()
  }, [])

  const dealsCurrentPeriod = 58
  const dealsPrevPeriod = 54

  return (
    <div className={styles.root}>
      <LkLayoutTitleData title={'Статистика по пункту приёма'} />
      <DatesPanel />
      <CardLayout title={point?.address.address as string}
        topClassName={styles.top}
      >
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
        <VisibleXs><Button className={styles.mobile} reverse styleType='large' color='grey' icon={<ChevronRightSvg color={colors.blue500} />}>Детали</Button></VisibleXs>
      </CardLayout>
      <LineChart title='Просмотры страницы пункта приёма' />
      <CardLayout>
        <PricingTable headerRow={{
          cells: [
            { value: <>Номер сделки</> },
            { value: <>Категория лома</> },
            { value: <>Вес лома, тонн</> },
            { value: <>Сумма сделки</> },
            { value: 'Доставка' },
            { value: 'Расстояние' },
          ]
        }} data={[
          {
            cells: [{ value: '245' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },

            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
        ] ?? []}
        />
      </CardLayout>
    </div >
  )
}
StatisticReceivingPointPage.getLayout = LkPageLayout
export default StatisticReceivingPointPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

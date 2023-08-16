import { useState, useEffect } from 'react'
import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkPageLayout } from '@/pages/lk'
import Donut from '@/components/for_pages/LkPage/layout/LkStatsMenu/Donut'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import PricingTable from '@/components/for_pages/Common/PricingTable'
import DatesPanel from '@/components/for_pages/LkPage/layout/LkStatsMenu/DatesPanel'
import { LkLayoutTitleData } from '@/context/lk_layout_content'

interface Props {

}

const StatisticDealsPage = (props: Props) => {

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

  return (
    <div className={styles.root}>
      <LkLayoutTitleData title={'Статистика по сделкам'} />
      <DatesPanel />
      <CardLayout>
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
      <CardLayout>

        <PricingTable headerRow={{
          cells: [
            { value: <>Номер <br />сделки</> },
            { value: 'Пункт приёма' },
            { value: <>Категория<br /> лома</> },
            { value: <>Вес лома,<br /> тонн</> },
            { value: <>Сумма<br /> сделки</> },
            { value: 'Доставка' },
            { value: 'Расстояние' },
          ]
        }} data={[
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            { value: 'Да' },
            { value: '10 км' },
            ]
          },
          {
            cells: [{ value: '245' },
            { value: 'Зои Космодемьянской 32' },
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
    </div>
  )
}

StatisticDealsPage.getLayout = LkPageLayout
export default StatisticDealsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

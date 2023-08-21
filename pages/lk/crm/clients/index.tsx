import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkReceivingPageLayout } from '@/pages/lk'
import { LkLayoutTitleData } from '@/context/lk_layout_content'
import styles from './index.module.scss'
import DatesPanel from '@/components/for_pages/LkPage/crm/components/DatesPanel'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import PricingTable from '@/components/for_pages/Common/PricingTable'

interface Props {

}

const StatisticClientsPage = (props: Props) => {

  return (
    <div className={styles.root}>
      <LkLayoutTitleData title={'Статистика по пункту приёма'} />
      <DatesPanel />

      <CardLayout>

        <PricingTable headerRow={{
          cells: [
            { value: 'Телефон' },
            { value: 'ФИО клиента' },
            { value: 'Категория' },
            { value: 'Вес лома, тонн' },
            { value: 'Сумма сделки' },
          ]
        }} data={[
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },
          {
            cells: [
            { value: '+7 (999) 876-54-32' },
            { value: 'Иванов Иван Иванович' },
            { value: '3А' },
            { value: '22' },
            { value: '2 230 000 ₽' },
            ]
          },

        ] ?? []}
        />
      </CardLayout>
    </div >
  )
}
StatisticClientsPage.getLayout = LkReceivingPageLayout
export default StatisticClientsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

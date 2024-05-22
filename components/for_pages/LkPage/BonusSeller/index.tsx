import styles from './index.module.scss'
import Formatter from '@/utils/formatter'
import {
  BonusTransactionListOwnerWrapper,
  useBonusTransactionListOwnerContext
} from '@/context/bonus_transaction_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'
import BonusSellerTransactionsTable from '@/components/for_pages/LkPage/BonusSeller/BonusSellerTransactionsTable'


interface Props {
}

const BonusSellerInner = (props: Props) => {
  const bonusTransactionsContext = useBonusTransactionListOwnerContext()

  const data = bonusTransactionsContext.data
  useEffectOnce(() => {
    bonusTransactionsContext.reFetch()
  })
  return (
    <div className={styles.root}>
      <div className={styles.heading}>Бонусы</div>
      {!bonusTransactionsContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
      {bonusTransactionsContext.isLoaded && bonusTransactionsContext.data.total === 0 &&
        <div className={styles.empty}>
          <p>Здесь будет отображаться история бонусных начислений, после того как вы выполните одно из условий бонусной программы:</p>
          <ol>
            <li>Завершите первую успешную сделку по продаже лома (бонус 800 ₽)</li>
            <li>Продайте лом весом свыше 10 тонн в рамках одной сделки (бонус 300 ₽ за каждые 10 тонн).</li>
          </ol>
        </div>}
      {bonusTransactionsContext.isLoaded && bonusTransactionsContext.data.total > 0 && <BonusSellerTransactionsTable headerRow={{
      cells: [
        { value: 'Тип бонуса' },
        { value: <>Номер сделки</> },
        { value: 'Дата сделки'},
        { value: 'Сумма бонуса' },
      ]
    }} data={data.data.map((i) => ({
      cells: [
        { value: i.description },
        { value: `${i.dealId}` },
        { value: Formatter.formatDateRelative(i.createdAt!) ?? '' },
        { value: Formatter.formatPrice(i.amount)},
      ]
    }))}
    />}
    </div>
  )
}
export default function BonusSeller(props: Props) {
  return (<BonusTransactionListOwnerWrapper>
    <BonusSellerInner/>
  </BonusTransactionListOwnerWrapper>)
}

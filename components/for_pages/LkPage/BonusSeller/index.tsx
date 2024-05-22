import styles from './index.module.scss'
import Formatter from '@/utils/formatter'
import {
  BonusTransactionListOwnerWrapper,
  useBonusTransactionListOwnerContext
} from '@/context/bonus_transaction_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'
import BonusSellerTransactionsTable from '@/components/for_pages/LkPage/BonusSeller/BonusSellerTransactionsTable'
import Pagination from '@/components/ui/Pagination'
import {useBonusTariffContext} from '@/context/bonus_tariff_state'
import {BonusType} from '@/data/enum/BonusType'
import WeightUtils from '@/utils/WeightUtils'


interface Props {
}

const BonusSellerInner = (props: Props) => {
  const bonusTransactionsContext = useBonusTransactionListOwnerContext()
  const bonusTariffContext = useBonusTariffContext()
  const data = bonusTransactionsContext.data
  useEffectOnce(() => {
    bonusTransactionsContext.reFetch()
  })
  return (
    <div className={styles.root}>
      <div className={styles.heading}>Бонусы</div>
      {!bonusTransactionsContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
      {bonusTransactionsContext.isLoaded && bonusTransactionsContext.data.total == 0 &&
        <div className={styles.empty}>
          <p>Здесь будет отображаться история бонусных начислений, после того как вы выполните одно из условий бонусной программы:</p>
          <ol>
            <li>Завершите первую успешную сделку по продаже лома (бонус {Formatter.formatPrice(bonusTariffContext.byTypes[BonusType.FirstDeal as BonusType]?.amount)})</li>
            <li>Продайте лом весом свыше {WeightUtils.formatWeight(bonusTariffContext.byTypes[BonusType.DealFromWeight as BonusType]?.fromWeight ?? 0)} в рамках одной сделки (бонус {Formatter.formatPrice(bonusTariffContext.byTypes[BonusType.DealFromWeight as BonusType]?.amount)} за каждые {WeightUtils.formatWeight(bonusTariffContext.byTypes[BonusType.DealFromWeight as BonusType]?.perWeight ?? 0)}).</li>
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
        { value: `${i.dealId ?? ''}` },
        { value: Formatter.formatDateRelative(i.createdAt!) ?? '' },
        { value: Formatter.formatPrice(i.amount)},
      ]
    }))}
    />}
      <Pagination pageCount={bonusTransactionsContext.pageCount} page={bonusTransactionsContext.page} onSetPage={bonusTransactionsContext.setPage}/>

    </div>
  )
}
export default function BonusSeller(props: Props) {
  return (<BonusTransactionListOwnerWrapper>
    <BonusSellerInner/>
  </BonusTransactionListOwnerWrapper>)
}

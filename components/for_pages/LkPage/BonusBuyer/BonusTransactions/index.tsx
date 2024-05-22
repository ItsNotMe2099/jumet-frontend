import styles from './index.module.scss'
import Formatter from '@/utils/formatter'
import {
  BonusTransactionListOwnerWrapper,
  useBonusTransactionListOwnerContext
} from '@/context/bonus_transaction_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'
import EmptyStub from '@/components/ui/EmptyStub'
import BonusBuyerTransactionsTable
  from '@/components/for_pages/LkPage/BonusBuyer/BonusTransactions/BonusBuyerTransactionsTable'
import Pagination from '@/components/ui/Pagination'


interface Props {
}

const BonusTransactionsInner = (props: Props) => {
  const bonusTransactionsContext = useBonusTransactionListOwnerContext()

  const data = bonusTransactionsContext.data
  useEffectOnce(() => {
    bonusTransactionsContext.reFetch()
  })
  console.log('bonusTransactionsContext.page', bonusTransactionsContext.page)
  return (
    <div className={styles.root}>
      {!bonusTransactionsContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
      {bonusTransactionsContext.isLoaded && bonusTransactionsContext.data.total === 0 &&
        <EmptyStub title={'Пока вы не получили ни одного бонуса'} text={'Как только будет оплачена первая сделка здесь будут отображены все начисления бонусов по вашим сделкам'}/>}
      {bonusTransactionsContext.isLoaded && bonusTransactionsContext.data.total > 0 && <BonusBuyerTransactionsTable headerRow={{
      cells: [
        { value: <>Номер <br />сделки</> },
        { value: 'Пункт приёма' },
        { value: 'Тип бонуса' },
        { value: 'Дата сделки'},
        { value: 'Сумма бонуса' },
      ]
    }} data={data.data.map((i) => ({
      cells: [{ value: `${i.dealId ?? ''}` },
        { value: <div title={i.receivingPoint?.address.street as string} className={styles.address}>{i.receivingPoint?.address.street}</div> },
        { value: i.description },
        { value: Formatter.formatDateRelative(i.createdAt!) ?? '' },
        { value: Formatter.formatPrice(i.amount)},
      ]
    }))}
    />}
      <Pagination pageCount={bonusTransactionsContext.pageCount} page={bonusTransactionsContext.page} onSetPage={bonusTransactionsContext.setPage}/>
    </div>
  )
}
export default function BonusTransactions(props: Props) {
  return (<BonusTransactionListOwnerWrapper>
    <BonusTransactionsInner/>
  </BonusTransactionListOwnerWrapper>)
}

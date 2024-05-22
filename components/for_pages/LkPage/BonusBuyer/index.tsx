import styles from './index.module.scss'
import {BonusBalanceWrapper, useBonusBalanceContext} from '@/context/bonus_balance_state'
import Formatter from '@/utils/formatter'
import Button from '@/components/ui/Button'
import Tabs from '@/components/ui/Tabs'
import {useState} from 'react'
import BonusTransactions from '@/components/for_pages/LkPage/BonusBuyer/BonusTransactions'
import BonusInvoices from '@/components/for_pages/LkPage/BonusBuyer/BonusInvoices'
import {Routes} from '@/types/routes'
import Spinner from '@/components/ui/Spinner'

enum TabKey{
  Transactions = 'transactions',
  Invoices = 'invoices'
}
interface Props {

}

const BonusBuyerInner = (props: Props) => {
  const bonusBalanceContext = useBonusBalanceContext()
  const [tab, setTab] = useState<TabKey>(TabKey.Transactions)
  console.log('bonusBalanceContext', bonusBalanceContext.balance)
  return <div className={styles.root}>
   <div className={styles.header}>
      <div className={styles.heading}>Бонусы</div>
     {!bonusBalanceContext.isLoaded  &&       <Spinner size={32} />}
     {bonusBalanceContext.isLoaded  &&    <div className={styles.right}>
        <div className={styles.label}>Сумма к возмещению <span className={styles.balance}>{Formatter.formatPrice(bonusBalanceContext.balance ?? 0)}</span></div>
        <div className={styles.available}>Доступно с 28 числа каждого месяца</div>
        <Button  disabled={!bonusBalanceContext.balance} type='button' styleType='large' color='blue' href={Routes.lkBonusInvoiceCreate} className={styles.btn}>
          {(bonusBalanceContext.balance ?? 0 )> 0 ? `Выставить счет на ${Formatter.formatPrice(bonusBalanceContext.balance ?? 0)}` : 'Выставить счет'}
        </Button>
      </div>}
    </div>
    <Tabs<TabKey> styleType={'outlined'} options={[{label: 'Бонусы', value: TabKey.Transactions}, {label: 'История выплат', value: TabKey.Invoices}]} value={tab} onClick={(tab) => setTab(tab)}/>
    {tab === TabKey.Transactions && <BonusTransactions/>}
    {tab === TabKey.Invoices && <BonusInvoices/>}
  </div>
}

export default function BonusBuyer(props: Props) {
  return <BonusBalanceWrapper>
    <BonusBuyerInner/>
  </BonusBalanceWrapper>
}

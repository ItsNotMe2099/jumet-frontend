import styles from './index.module.scss'
import Formatter from '@/utils/formatter'


import Dictionary from '@/utils/Dictionary'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'
import EmptyStub from '@/components/ui/EmptyStub'
import {BonusInvoiceListOwnerWrapper, useBonusInvoiceListOwnerContext} from '@/context/bonus_invoice_list_state'
import BonusInvoicesTable from '@/components/for_pages/LkPage/BonusBuyer/BonusInvoices/BonusInvoicesTable'
import Pagination from '@/components/ui/Pagination'


interface Props {
}

const BonusInvoicesInner = (props: Props) => {
  const bonusInvoicesContext = useBonusInvoiceListOwnerContext()

  const data = bonusInvoicesContext.data
  useEffectOnce(() => {
    bonusInvoicesContext.reFetch()
  })
  return (
    <div className={styles.root}>
      {!bonusInvoicesContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
      {bonusInvoicesContext.isLoaded && bonusInvoicesContext.data.total === 0 &&
        <EmptyStub title={'Пока вы не выставили ни одного счета'} text={''}/>}
      {bonusInvoicesContext.isLoaded && bonusInvoicesContext.data.total > 0 && <BonusInvoicesTable headerRow={{
      cells: [
        { value: 'Номер счета' },
        { value: 'Сумма выплаты' },
        { value: 'Статус оплаты' },
        { value: 'Дата выплаты'}
      ]
    }} data={data.data.map((i) => ({
      cells: [{ value: `${i.id}` },
        { value: i.amount ? Formatter.formatPrice(i.amount) : '-'},
        { value: Dictionary.getBonusInvoiceStatus(i.status) ?? '' },
        { value: Formatter.formatDateRelative(i.paidAt!) ?? '' },
      ]
    }))}
    />}
      <Pagination pageCount={bonusInvoicesContext.pageCount} page={bonusInvoicesContext.page} onSetPage={bonusInvoicesContext.setPage}/>

    </div>
  )
}
export default function BonusInvoices(props: Props) {
  return (<BonusInvoiceListOwnerWrapper>
    <BonusInvoicesInner/>
  </BonusInvoiceListOwnerWrapper>)
}

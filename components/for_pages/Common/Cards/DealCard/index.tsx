import styles from './index.module.scss'
import Formatter from '@/utils/formatter'
import {Routes} from '@/types/routes'
import Link from 'next/link'
import StatusBadge, {StatusBadgeColor} from '@/components/ui/StatusBadge'
import {IOption} from '@/types/types'
import {ReactElement, useEffect, useMemo} from 'react'
import {IDeal} from '@/data/interfaces/IDeal'
import {DealWrapper, useDealContext} from '@/context/deal_state'
import UserUtils from '@/utils/UserUtils'
import {DealStatus} from '@/data/enum/DealStatus'
import classNames from 'classnames'
import {useAppContext} from '@/context/state'
import DealUtils, {IDealStateDetails} from '@/utils/DealUtils'
import {useNotificationContext} from '@/context/notifications_state'
import {NotificationUnreadType} from '@/data/interfaces/INotification'
import NotificationBadge from '@/components/ui/NotificationBadge'

interface FieldProps {
  item: IOption<number | string | ReactElement>
}

function Field(props: FieldProps) {
  return (<div className={styles.field}>
    <div className={styles.label}>
      {props.item.label}
    </div>
    <div className={styles.value}>
      {props.item.value}
    </div>
  </div>)
}

interface Props {
  deal: IDeal
  mode: 'seller' | 'buyer'
}

const DealCardInner = (props: Props) => {
  const appContext = useAppContext()
  const dealContext = useDealContext()
  const notifyContext = useNotificationContext()
  const deal = dealContext.deal!
  const active = notifyContext.store[NotificationUnreadType.deal].find(i => i.eId === deal.id)
  const options: IOption<string>[] = props.mode === 'seller' ? [
    {label: 'Покупатель', value: deal.receivingPoint.company?.name ?? ''},
    {label: 'Адрес пункта приема', value: deal.receivingPoint.address?.address ?? ''},
    {label: 'Доставка', value: deal.requiresDelivery ? 'Нужна доставка' : ''},
    {label: 'Погрузка', value: deal.requiresLoading ? 'Нужна погрузка' : '-'},
    {label: 'Дата создания', value: Formatter.formatDateRelative(deal.createdAt!) ?? ''}
  ] : [
    {label: 'Продавец', value: UserUtils.getName(deal.seller) ?? ''},
    {label: 'Адрес распложения лома', value: deal.address?.address ?? ''},
    {label: 'Доставка', value: deal.requiresDelivery ? 'Нужна доставка' : ''},
    {label: 'Погрузка', value: deal.requiresLoading ? 'Нужна погрузка' : '-'},
    {label: 'Дата создания', value: Formatter.formatDateRelative(deal.createdAt!) ?? ''}
  ]
  const allStatuesDescription = useMemo(() => appContext.aboutMe?.role! ? DealUtils.getStateDescriptionAllStatus(deal, appContext.aboutMe?.role!) : {}, [deal, appContext.aboutMe?.role])
  useEffect(() => {
    console.log('AddDealId', deal.id)
    notifyContext.addRecord(deal.id, NotificationUnreadType.deal)
    return () => {
      console.log('RemoveDealId', deal.id)
      notifyContext.removeRecord(deal.id, NotificationUnreadType.deal)
    }
  }, [])

  useEffect(() => {
    if (active) {
      if (([DealStatus.TerminatedByBuyer, DealStatus.TerminatedByBuyer, DealStatus.Paid] as DealStatus[]).includes(deal.status)) {
        notifyContext.markRead(deal.id, NotificationUnreadType.deal, true)
      }
    }
  }, [active])
  return (
    <Link href={Routes.lkDeal(deal.id)} className={styles.root}>
      <div className={styles.top}>

        <Link href={Routes.lkDeal(deal.id)} className={styles.title}>
          Сделка №{deal.id}
        </Link>
        <StatusBadge<DealStatus> data={
          Object.entries(allStatuesDescription).reduce((p, [k, v]) => ({
         ...p, [k]: {
              label: (v as IDealStateDetails)?.shortName ?? (v as IDealStateDetails)?.name,
              color: (v as IDealStateDetails)?.color
            }
          } as any), {} as { [key in DealStatus]: {label: string, color: StatusBadgeColor} })
        } value={deal.status}/>
        {active && <NotificationBadge position={'static'} empty className={styles.badge} color={'blue'}/>}
      </div>
      <div className={styles.center}>
        <div className={classNames(styles.column, {[styles.first]: true})}>
          {[...options].slice(0, 2).map((i, index) => <Field key={index} item={i}/>)}
        </div>
        <div className={styles.column}>
          {[...options].slice(-3).map((i, index) => <Field key={index} item={i}/>)}
        </div>
      </div>
    </Link>
  )
}
export default function DealCard(props: Props) {
  return <DealWrapper dealId={props.deal.id} deal={props.deal}>
    <DealCardInner deal={props.deal} mode={props.mode}/>
  </DealWrapper>
}

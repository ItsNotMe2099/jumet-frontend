import Badge from '@/components/ui/Badge'
import styles from './index.module.scss'
import StarSvg from '@/components/svg/StarSvg'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import Formatter from '@/utils/formatter'


interface Props {
 item: IReceivingPoint
}

export default function ReceivingPointSearchCard(props: Props) {

  const openingStatus = props.item.workNow  ? 'Открыто сейчас' : (props.item.nextWorkTime ? `Откроется в ${Formatter.formatDateRelative(props.item.nextWorkTime!)}` : '')


  // format the opening time to display in the UI

  return (
    <Link href={Routes.receivingPoint(props.item.id)}>
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.right}>
            <div className={styles.title}>
              {props.item.name}
            </div>
            {props.item.rating && <div className={styles.rating}>
              <StarSvg color={colors.yellow500} />
              <div className={styles.number}>{props.item.rating}</div>
            </div>}
          </div>
          {props.item.price && <div className={styles.price}>
            До {props.item.price} ₽/тонна
          </div>}
        </div>
        <div className={styles.middle}>
          {props.item.address?.address}
        </div>
        <div className={styles.bottom}>
          <Badge active={props.item.hasDelivery} text='Есть доставка' />
          <Badge active={props.item.hasLoading} text='Есть погрузка' />
          {openingStatus && <Badge
            active={props.item.workNow}
            text={openingStatus} />}
        </div>
      </div>
    </Link>
  )
}

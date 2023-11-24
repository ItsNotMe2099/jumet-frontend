'use client'

import React, {CSSProperties, forwardRef, MouseEventHandler} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import styles from './index.module.scss'
import Formatter from '@/utils/formatter'
import Badge from '@/components/ui/Badge'
import StarSvg from '@/components/svg/StarSvg'
import {colors} from '@/styles/variables'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import classNames from 'classnames'
import Link from 'next/link'
import {Routes} from '@/types/routes'
interface Props {
  receivingPoint: IReceivingPoint;
  style: CSSProperties
  onClose: () => void
}

const ReceivingPointMapPopupInner =  forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const openingStatus = props.receivingPoint.workNow  ? 'Открыто сейчас' : (props.receivingPoint.nextWorkTime ? `Откроется ${Formatter.formatDateRelative(props.receivingPoint.nextWorkTime!)}` : '')
  const handleClose: MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.onClose()
  }
  return (
    <Link href={Routes.receivingPoint(props.receivingPoint.id)} target={'_blank'} className={styles.root} ref={ref} id={'receiving-point-ballon'}>
        <CloseModalBtn className={classNames(styles.close, 'ymap-popover-close')} onClick={handleClose}/>
      <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.name}>{props.receivingPoint.companyName}</div>
        {props.receivingPoint.rating && <div className={styles.rating}>
          <StarSvg color={colors.yellow500} />
          <div className={styles.number}>{props.receivingPoint.rating}</div>
        </div>}
      </div>
      {props.receivingPoint.price && <div className={styles.price}>
        До {Formatter.formatPrice(props.receivingPoint.price, '₽/тонна')}
      </div>}
      <div className={styles.address}>{props.receivingPoint.address?.address}</div>
      <div className={styles.bottom}>
        <Badge active={props.receivingPoint.hasDelivery} text={props.receivingPoint.hasDelivery ? 'Есть доставка' : 'Нет доставки'} className={styles.badge}/>
        <Badge active={props.receivingPoint.hasLoading} text={props.receivingPoint.hasLoading ? 'Есть погрузка' : 'Нет погрузки'} className={styles.badge}/>
        {openingStatus && <Badge
          active={props.receivingPoint.workNow}
          text={openingStatus} className={styles.badge}/>}
      </div>
      </div>
    </Link>
  )
})
export default ReceivingPointMapPopupInner

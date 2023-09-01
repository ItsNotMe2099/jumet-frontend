import styles from '@/components/for_pages/ReceivingPoint/Cards/ContactsViewCard/index.module.scss'
import {colors} from '@/styles/variables'
import PhoneSvg from '@/components/svg/PhoneSvg'
import {useMemo, useRef, useState} from 'react'
import DeliverySvg from '@/components/svg/DeliverySvg'
import LoadingSvg from '@/components/svg/LoadingSvg'
import TimeSvg from '@/components/svg/TimeSvg'
import classNames from 'classnames'
import Button from '@/components/ui/Button'
import Rating from '@/components/for_pages/Common/Rating'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import Formatter from '@/utils/formatter'
import FavoriteBtn from '@/components/for_pages/Common/FavoriteBtn'
import {LikeEntityType} from '@/data/enum/LikeEntityType'
import {Routes} from '@/types/routes'
import {useAppContext} from '@/context/state'
import {Goal, ModalType} from '@/types/enums'
import {UserRole} from '@/data/enum/UserRole'
import {useRouter} from 'next/router'
import ShareLinkButton from '@/components/ui/Buttons/ShareLinkButton'
import {SaleRequestOfferModalArguments} from '@/types/modal_arguments'
import {Nullable} from '@/types/types'
import Analytics from '@/utils/goals'


interface Props {
  receivingPoint: IReceivingPoint
}

export default function ContactsViewCard(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [showPhone, setShowPhone] = useState<boolean>(false)
  const isOpen = true
  const { receivingPoint } = props
  const showPhoneRefFirstClick = useRef(false)
  const handleCreateOffer = () => {
    if(!appContext.isLogged){
      router.push(Routes.login(Routes.saleRequest(props.receivingPoint.id)))
    }else{
      appContext.showModal(ModalType.SaleRequestOffer, {receivingPointId: props.receivingPoint.id} as SaleRequestOfferModalArguments)
    }
  }

  const phones = useMemo<Nullable<string>>(() => {
    if(!showPhone){
    return (receivingPoint.phones?.length ?? 0) > 0 ?  Formatter.formatPhone(receivingPoint.phones![0]).slice(0, Formatter.formatPhone(receivingPoint.phones![0])?.length - 6) : null
    }else{
    return receivingPoint.phones?.map(i => Formatter.formatPhone(i)).join(', ')
    }

  }, [receivingPoint?.phones, showPhone])
  const handleTogglePhone = () => {
    if(!showPhoneRefFirstClick.current) {
      Analytics.goal(Goal.ReceivingPointPhoneClick)
    }
    setShowPhone(!showPhone)
    showPhoneRefFirstClick.current = true
  }
  return (
    <ReceivingPointViewCard title={<div className={styles.header}>
      <div className={styles.title}>{receivingPoint.name ?? ''}</div>
      {receivingPoint.rating > 0 && <Rating rating={receivingPoint.rating} />}</div>}>
      <div className={styles.middle}>
        <div className={styles.phone}>
          <PhoneSvg color={colors.dark500} />
          {(receivingPoint.phones?.length ?? 0) > 0 && <div className={styles.phoneNumber}>
            {phones}
            {showPhone ? <></> : <> ...</>}</div>}
          <div className={styles.show}
            onClick={handleTogglePhone}>
            {showPhone ? <> Скрыть {(receivingPoint.phones?.length ?? 0) > 0 ? 'номера' : 'номер'}</> : <> Показать {(receivingPoint.phones?.length ?? 0) > 0 ? 'номера' : 'номер'}</>}
          </div>
        </div>
        <div className={styles.properties}>
          <div className={styles.property}>
            <DeliverySvg color={receivingPoint.hasDelivery ? colors.dark500 : colors.grey500} />
            <div
              className={classNames(styles.text, { [styles.inactiveText]: !receivingPoint.hasDelivery })}>{receivingPoint.hasDelivery ? <>Есть
                доставка</> : <>Нет доставки</>}</div>
          </div>
          <div className={styles.property}>
            <LoadingSvg color={receivingPoint.hasLoading ? colors.dark500 : colors.grey500} />
            <div
              className={classNames(styles.text, { [styles.inactiveText]: !receivingPoint.hasLoading })}>{receivingPoint.hasLoading ? <>Есть
                погрузка</> : <>Нет погрузки</>}</div>
          </div>
          <div className={styles.property}>
            <TimeSvg color={isOpen ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, {
              [styles.inactiveText]: !isOpen
            })}>
              {isOpen ? <>Открыто сейчас</> : <>Закрыто</>}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        {!appContext.isLogged || appContext?.aboutMe?.role === UserRole.Seller && <Button onClick={handleCreateOffer} className={styles.suggest} styleType='large' color='blue'>
          Предложить сделку
        </Button>}
        <FavoriteBtn entityType={LikeEntityType.receivingPoint} id={props.receivingPoint.id}/>
        <ShareLinkButton styleType='small' color='grey' shareLink={Routes.receivingPoint(props.receivingPoint.id)} />
      </div>
    </ReceivingPointViewCard>
  )
}

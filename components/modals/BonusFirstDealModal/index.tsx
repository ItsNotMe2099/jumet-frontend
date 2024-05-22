import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalBody from '@/components/layout/Modal/ModalBody'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
import {BonusType} from '@/data/enum/BonusType'
import {useBonusTariffContext} from '@/context/bonus_tariff_state'
import Formatter from '@/utils/formatter'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import {colors} from '@/styles/variables'

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

export function BonusFirstDealModal(props: Props) {
  const appContext = useAppContext()
  const bonusTariffContext = useBonusTariffContext()
  return (
    <ModalLayout size={'large'}>
      <div className={styles.header}>
        <div className={styles.close}>
          <CloseModalBtn onClick={() => props.onRequestClose()} color={colors.grey500}/>
        </div>
        <Image src={'/img/bonus_seller_modal.png'} alt='' width={385.16} height={248.56}/>
      </div>
      <ModalBody className={styles.modalBody}>
        <div className={styles.title}>Бонус за первую сделку продавцам лома</div>
        <div className={styles.text}>
          Получите бонус {Formatter.formatPrice(bonusTariffContext.byTypes[BonusType.FirstDeal as BonusType]?.amount)} за первую
          успешную сделку по продаже лома
        </div>
        <Button styleType={'large'} color={'blue'} href={Routes.registration}
                onClick={() => props.onRequestClose()}>Зарегистрироваться</Button>
      </ModalBody>
    </ModalLayout>
  )

}

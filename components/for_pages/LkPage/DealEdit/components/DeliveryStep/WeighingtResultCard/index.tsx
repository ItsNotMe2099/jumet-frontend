import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import { useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'
import DealRepository from '@/data/repositories/DealRepository'
//import Formatter from '@/utils/formatter'



interface Props {
  id: number
}

export default function WeighningResultCard(props: Props) {

  const [active, setActive] = useState<boolean>(false)

  const appContext = useAppContext()

  const terminateDeal = async () => {
    await DealRepository.terminateBySeller(props.id)
  }

  return (
    <CardLayout titleClassName={styles.title} topClassName={styles.additional} title={'Результат взвешивания'}
      toggleEl={active ? <ChevronUpSvg onClick={() => setActive(false)} className={styles.chevron} color={colors.grey500} /> :
        <ChevronDownSvg onClick={() => setActive(true)} className={styles.chevron} color={colors.grey500} />}
      additionalEl={
        <div className={styles.additional}>
          <div className={styles.date}>
            {/*Formatter.formatDateRelative(props.offer.createdAt as string)*/}21 октября
          </div>
        </div>}>
      {active &&
        <div className={styles.root}>
          <div className={styles.item}>
            <div className={styles.top}>
              Общий вес лома
            </div>
            <div className={styles.bottom}>
              1,2 тонны
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              Засор
            </div>
            <div className={styles.bottom}>
              5% (0,24 тонны)
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              Комментарий к качеству лома
            </div>
            <div className={styles.bottom}>
              Лон не айс
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              Вес лома за вычетом засора
            </div>
            <div className={styles.bottom}>
              1,76 тонны
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              К оплате
            </div>
            <div className={styles.bottom}>
              23 000 ₽
            </div>
          </div>
          <div className={styles.image}>
            <Image src={'/img/photo1.png'} alt='' fill />
          </div>
          <div className={styles.btns}>
            <Button styleType='large' color='blue'>
              Подтвердить
            </Button>
            <Button onClick={() =>
              appContext.showModal(ModalType.Confirm, {
                title: 'Вы действительно хотите расторгнуть сделку?',
                text: 'Отменить это действие нельзя', cancel: 'Закрыть окно', confirm: 'Да, расторгнуть',
                confirmColor: 'red',
                onConfirm: terminateDeal()
              })}
              className={styles.decline} styleType='large' color='grey'>
              Расторгнуть сделку
            </Button>
          </div>
        </div>}
    </CardLayout>
  )
}

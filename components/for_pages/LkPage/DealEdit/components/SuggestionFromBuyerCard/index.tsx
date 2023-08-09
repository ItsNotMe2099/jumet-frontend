import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import { useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import Badge from '@/components/ui/Badge'
//import Formatter from '@/utils/formatter'



interface Props {
  offer?: IDealOffer
}

export default function SuggestionFromBuyerCard(props: Props) {

  const [active, setActive] = useState<boolean>(false)

  return (
    <CardLayout titleClassName={styles.title} topClassName={styles.additional} title={'Предложение покупателя'}
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
        <div className={styles.badges}>
          <Badge active text='23 000 ₽/ тонна' />
          <Badge active text='Доставка – 500 ₽' />
          <Badge
            active
            text={'Погрузка – бесплатно'} />
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            Покупатель
          </div>
          <div className={styles.bottom}>
            Первая ломозаготовительная компания
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            Адрес пункта приёма
          </div>
          <div className={styles.bottom}>
            г. Сергиев Посад, ул. Зои Космодемьянской, 32
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            Комментарий
          </div>
          <div className={styles.bottom}>
            Вывоз металлолома, вывоз металла, вывоз лома. ПРИНИМАЕМ ДОРОГО! ВЫВОЗИМ БЫСТРО ПО ВСЕМ РАЙОНАМ Москвы и обл. Опломбированные весы. Расчет сразу после взвешивания.
          </div>
        </div>
      </div>}
    </CardLayout>
  )
}

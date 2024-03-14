import Icon1Svg from '@/components/svg/landing/advantages-blue/Icon1Svg'
import styles from './index.module.scss'
import Icon2Svg from '@/components/svg/landing/advantages-blue/Icon2Svg'
import Icon3Svg from '@/components/svg/landing/advantages-blue/Icon3Svg'
import Icon4Svg from '@/components/svg/landing/advantages-blue/Icon4Svg'
import Icon5Svg from '@/components/svg/landing/advantages-blue/Icon5Svg'
import Icon6Svg from '@/components/svg/landing/advantages-blue/Icon6Svg'
import Icon7Svg from '@/components/svg/landing/advantages-blue/Icon7Svg'
import Icon8Svg from '@/components/svg/landing/advantages-blue/Icon8Svg'
import Item from './Item'

interface Props {

}

export default function AdvantagesBlue(props: Props) {

  const items = [
    { icon: <Icon1Svg />, text: 'Электронная торговая площадка самых выгодных сделок купли-продажи лома' },
    { icon: <Icon2Svg />, text: 'Удобный поиск для продавцов и покупателей лома' },
    { icon: <Icon3Svg />, text: 'Быстрое заключение сделок онлайн' },
    { icon: <Icon4Svg />, text: 'Электронный документооборот' },
    { icon: <Icon5Svg />, text: 'Гарантия и безопасность' },
    { icon: <Icon6Svg />, text: 'Аукцион' },
    { icon: <Icon7Svg />, text: 'Уникальная клиентская база' },
    { icon: <Icon8Svg />, text: 'Что-то еще' },
  ]

  return (
    <div className={styles.container} id='benefits'>
      <div className={styles.root}>
        <div className={styles.row}>
          {items.map((i, index) =>
            <Item icon={i.icon} text={i.text} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}

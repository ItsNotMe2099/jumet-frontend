import Advantages1Svg from '@/components/svg/landing/advantages/Advantages1Svg'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import Advantages2Svg from '@/components/svg/landing/advantages/Advantages2Svg'
import ExchangeSvg from '@/components/svg/landing/advantages/ExchangeSvg'
import AvatarSvg from '@/components/svg/landing/advantages/AvatarSvg'
import Avatar2Svg from '@/components/svg/landing/advantages/Avatar2Svg'

interface Props {

}

export default function Advantages(props: Props) {

  return (
    <div className={styles.root} id='advantages'>
      <div className={styles.container}>
        <div className={styles.title}>
          Преимущества покупки и продажи лома
          в cервисе JUMET
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.image}>
                <Advantages1Svg />
              </div>
              <div className={styles.name}>
                <AvatarSvg />
                <span>Преимущества для
                  продавцов лома,</span><br />
                ломосдатчиков
              </div>
              <ul>
                <li>Продал 2500 кг лома вида 5А,12 А </li>
                <li>за 62 500 ₽</li>
                <li>в течение 5 мин</li>
                <li>с выгодой до 10%</li>
              </ul>
              <Button href={'/landing/for-sellers'} className={styles.btn} styleType='large' color='blue'>
                Смотреть приемущества
              </Button>
            </div>
          </div>
          <div className={styles.exchange}>
            <ExchangeSvg />
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.image}>
                <Advantages2Svg />
              </div>
              <div className={styles.name}>
                <Avatar2Svg />
                <span>Преимущества для покупателей лома,
                </span><br />
                ломозаготовителей
              </div>
              <ul>
                <li>Продал 2500 кг лома вида 5А,12 А </li>
                <li>за 62 500 ₽</li>
                <li>в течение 5 мин</li>
                <li>с выгодой до 10%</li>
              </ul>
              <Button href={'/landing/for-buyers'} className={styles.btn} styleType='large' color='blue'>
                Смотреть приемущества
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

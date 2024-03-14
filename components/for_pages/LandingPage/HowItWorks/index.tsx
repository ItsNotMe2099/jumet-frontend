import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import AvatarSvg from '@/components/svg/landing/advantages/AvatarSvg'
import Image from 'next/image'
import Avatar2Svg from '@/components/svg/landing/advantages/Avatar2Svg'

interface Props {

}

export default function HowItWorks(props: Props) {

  return (
    <div className={styles.root} id='how-it-works'>
      <div className={styles.container}>
        <div className={styles.title}>
          Как работает сервис?
        </div>
        <div className={styles.item}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.img}>
                <Image src={'/img/landing/how-it-work.png'} alt='' fill />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.name}>
                <div><AvatarSvg /></div>
                <div><span>Продавец, ломосдатчик</span></div>
              </div>
              <ol>
                <li>Создает предложение о продаже лома в сервисе JUMET</li>
                <li>Предлагает продать лом, напрямую покупателю или через аукцион</li>
                <li>Заключает сделку в режиме онлайн</li>
              </ol>
              <Button className={styles.btn} styleType='large' color='blue'>
                Смотреть подробнее
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.name}>
                <div><Avatar2Svg /></div>
                <div><span>Покупатель, ломозаготовитель</span></div>
              </div>
              <ol>
                <li>Регистрация + Выбор региона</li>
                <li>Получает доступ к клиентской базе с предложениями</li>
                <li>Находит предложения о продаже лома в сервисе JUMET</li>
                <li>Покупает лом на аукционе или по прямым<br /> предложениям от продавцов</li>
                <li>Заключает сделку в режиме онлайн</li>
              </ol>
              <Button className={styles.btn} styleType='large' color='blue'>
                Смотреть подробнее
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.img}>
                <Image src={'/img/landing/how-it-work2.png'} alt='' fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

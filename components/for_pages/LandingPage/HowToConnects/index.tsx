import Connect1Svg from '@/components/svg/landing/how-to-connects/Connect1Svg'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import Connect2Svg from '@/components/svg/landing/how-to-connects/Connect2Svg'
import { UserRole } from '@/data/enum/UserRole'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'

interface Props {

}

export default function HowToConnects(props: Props) {

  const appContext = useAppContext()

  const stepsSeller = [
    {
      image: '/img/landing/prodavec/reg/05.jpg',
      desc:
        <p>Зарегистрироваться в личном кабинете.</p>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/reg/06.jpg',
      desc:
        <p> Разместить ваши предложения о продаже лома.</p>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/reg/07.jpg',
      desc:
        <p>Сдавать лом на лучших для вас условиях!</p>,
      role: UserRole.Seller
    },
  ]

  const stepsBuyer = [
    {
      image: '/img/landing/pokupatel/reg/01.jpg',
      desc:
        <p>Зарегистрироваться в личном кабинете.</p>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/reg/04.jpg',
      desc:
        <p>Получить пакет документов на подписание.</p>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/reg/03.jpg',
      desc:
        <p>Подписать и отправить документы.</p>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/reg/06.jpg',
      desc:
        <p>Получить доступ к сервису.</p>,
      role: UserRole.Buyer
    },
  ]

  return (
    <div className={styles.root} id='how-to-connects'>
      <div className={styles.container}>
        <div className={styles.title}>
          Как подключиться к сервису JUMET
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.image}>
                <Connect1Svg />
              </div>
              <div className={styles.name}>
                <span>Продавцам,</span> ломосдатчикам
              </div>
              <ol>
                <li>Зарегистрироваться в личном кабинете</li>
                <li>Разместить ваши предложения о продаже</li>
                <li>Сдавать лом на лучших для вас условиях!</li>
              </ol>
              <Button onClick={() => appContext.showModal(ModalType.SwiperModal, stepsSeller)}
                className={styles.btn} styleType='large' color='blue'>
                Смотреть подробнее
              </Button>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.image}>
                <Connect2Svg />
              </div>
              <div className={styles.name}>
                <span>Покупателям,</span> ломозаготовителям
              </div>
              <ol>
                <li>Зарегистрироваться в личном кабинете</li>
                <li>Пройти проверку предоставленных сведений</li>
                <li>Получить пакет документов на подписание</li>
                <li>Подписать и отправить документы</li>
                <li>Оплатить доступ к сервису</li>
                <li>Получить доступ к сервису</li>
              </ol>
              <Button onClick={() => appContext.showModal(ModalType.SwiperModal, stepsBuyer)}
                className={styles.btn} styleType='large' color='blue'>
                Смотреть подробнее
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import AvatarSvg from '@/components/svg/landing/advantages/AvatarSvg'
import Image from 'next/image'
import Avatar2Svg from '@/components/svg/landing/advantages/Avatar2Svg'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'
import { UserRole } from '@/data/enum/UserRole'

interface Props {

}

export default function HowItWorks(props: Props) {

  const appContext = useAppContext()

  const stepsSeller = [
    {
      image: '/img/landing/prodavec/sdelka/01.jpg', name: 'Создание заявки на продажу.',
      desc:
        <><p>Создание заявки на продажу.</p>
          <p>Продавец создаёт заявку на продажу лома:</p>
          <ul>
            <li>Вводит вид  сдаваемого лома по категориям (3А, 5А, 12А, MIX)</li>
            <li>Количество  лома</li>
            <li>Вводит  адрес места, где находится лом</li>
            <li>Добавляет  фото лома (при возможности)</li>
            <li>Выбирает  самовывоз или доставку до покупателя</li>
            <li>Выбирает  форму оплаты (наличные или на карту)</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/02.jpg', name: 'Просмотр предложений по заявке.',
      desc:
        <><p>Продавец получает предложения по покупке от сервиса по введённым в заявке параметрам (учитывается):</p>
          <ul>
            <li>Расстояние  до покупателя</li>
            <li>Доставка/самовывоз</li>
            <li>Форма  оплаты (показываются оба варианта оплаты)</li>
            <li>Количество  лома</li>
            <li>Вид лома</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/02.jpg', name: 'Просмотр предложений по заявке.',
      desc:
        <><p>Продавец получает предложения по покупке от сервиса по введённым в заявке параметрам (учитывается):</p>
          <ul>
            <li>Расстояние  до покупателя</li>
            <li>Доставка/самовывоз</li>
            <li>Форма  оплаты (показываются оба варианта оплаты)</li>
            <li>Количество  лома</li>
            <li>Вид лома</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/02.jpg', name: 'Просмотр предложений по заявке.',
      desc:
        <><p>Продавец получает предложения по покупке от сервиса по введённым в заявке параметрам (учитывается):</p>
          <ul>
            <li>Расстояние  до покупателя</li>
            <li>Доставка/самовывоз</li>
            <li>Форма  оплаты (показываются оба варианта оплаты)</li>
            <li>Количество  лома</li>
            <li>Вид лома</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/02.jpg', name: 'Просмотр предложений по заявке.',
      desc:
        <><p>Продавец получает предложения по покупке от сервиса по введённым в заявке параметрам (учитывается):</p>
          <ul>
            <li>Расстояние  до покупателя</li>
            <li>Доставка/самовывоз</li>
            <li>Форма  оплаты (показываются оба варианта оплаты)</li>
            <li>Количество  лома</li>
            <li>Вид лома</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/02.jpg', name: 'Просмотр предложений по заявке.',
      desc:
        <><p>Продавец получает предложения по покупке от сервиса по введённым в заявке параметрам (учитывается):</p>
          <ul>
            <li>Расстояние  до покупателя</li>
            <li>Доставка/самовывоз</li>
            <li>Форма  оплаты (показываются оба варианта оплаты)</li>
            <li>Количество  лома</li>
            <li>Вид лома</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
  ]

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
              <Button onClick={() => appContext.showModal(ModalType.SwiperModal, stepsSeller)} className={styles.btn} styleType='large' color='blue'>
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

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
      image: '/img/landing/prodavec/sdelka/01.jpg',
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
      image: '/img/landing/prodavec/sdelka/02.jpg',
      desc:
        <><p>Просмотр предложений по заявке.</p>
          <p>Продавец получает предложения по покупке от сервиса по введённым в заявке параметрам (учитывается):</p>
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
      image: '/img/landing/prodavec/sdelka/03.jpg',
      desc:
        <><p>Фильтрация результатов поиска.</p>
          <p>Продавец при помощи фильтров выбирает наиболее интересные предложения по следующим параметрам:</p>
          <ul>
            <li>Цена  покупки с доставкой/самовывозом</li>
            <li>Расстояние  до покупателя</li>
            <li>Форма  оплаты</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/04.jpg',
      desc:
        <><p>Чат с выбранным продавцом.</p>
          <p>Продавец при необходимости связывается через чат с потенциальным  покупателем для уточнения дополнительных деталей сделки:</p>
          <ul>
            <li>времени  проведения сделки</li>
            <li>вариант  взвешивания</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/05.jpg',
      desc:
        <><p>Сделка:</p>
          <ul>
            <li>Продавец подтверждает выбор определенного  покупателя</li>
            <li>Формирует ему окончательное предложение</li>
            <li>Ожидает  подтверждение покупателя</li>
          </ul>
        </>,
      role: UserRole.Seller
    },
    {
      image: '/img/landing/prodavec/sdelka/06.jpg',
      desc:
        <p>Оценка и закрытие сделки. </p>,
      role: UserRole.Seller
    },
  ]

  const stepsBuyer = [
    {
      image: '/img/landing/pokupatel/sdelka/01.jpg',
      desc:
        <p>Регистрация покупателя, добавление пункта приема. </p>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/sdelka/02.jpg',
      desc:
        <><p>База предложений лома.</p>
          <p>Покупатель видит заявки на продажу от продавцов:</p>
          <ul>
            <li>количество  лома</li>
            <li>вид лома</li>
            <li>расстояние  до продавца</li>
            <li>желаемая  форма оплаты</li>
            <li>условия  доставки</li>
          </ul>
        </>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/sdelka/03.jpg',
      desc:
        <><p>Выбор предложений по фильтрам.</p>
          <p>Покупатель выбирает наиболее интересные предложения при помощи фильтров.</p>
        </>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/sdelka/04.jpg',
      desc:
        <><p>Формирование предложения по покупке лома. </p>
          <p>Покупатель формирует предложения по закупке лома:</p>
          <ul>
            <li>вводит стоимость,  по которой готов купить лом (2 варианта / с самовывозом и без)</li>
            <li>предлагает  вариант оплаты (на карту или безнал)</li>
          </ul>
        </>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/sdelka/05.jpg',
      desc:
        <>
          <p>Чат, обсуждение условий сделки.</p>
          <p>Покупатель при необходимости связывается через чат с потенциальным продавцом для уточнения сделки:</p>
          <ul>
            <li>времени  проведения сделки</li>
            <li>вариантов  взвешивания лома</li>
          </ul>
        </>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/sdelka/06.jpg',
      desc:
        <>
          <p>Сделка:</p>
          <ul>
            <li>Покупатель подтверждает выбор определенного  продавца</li>
            <li>Формирует ему окончательное предложение</li>
            <li>Ожидает подтверждение продавца</li>
          </ul>
        </>,
      role: UserRole.Buyer
    },
    {
      image: '/img/landing/pokupatel/sdelka/07.jpg',
      desc:
        <>
          <p>Закрывает сделку:</p>
          <ul>
            <li>Оценивает продавца</li>
            <li>Получает документы для отчетности</li>
          </ul>
        </>,
      role: UserRole.Buyer
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
              <Button onClick={() => appContext.showModal(ModalType.SwiperModal, stepsSeller)}
                className={styles.btn} styleType='large' color='blue'>
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
              <Button onClick={() => appContext.showModal(ModalType.SwiperModal, stepsBuyer)}
                className={styles.btn} styleType='large' color='blue'>
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

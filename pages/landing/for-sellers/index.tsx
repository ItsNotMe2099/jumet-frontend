import AdvantagesBlue from '@/components/for_pages/LandingPage/AdvantagesBlue'
import Advantages from '@/components/for_pages/LandingPage/for-sellers/Advantages'
import styles from './index.module.scss'
import Deals from '@/components/for_pages/LandingPage/for-sellers/Deals'
import Image1Svg from '@/components/svg/landing/for-sellers/Image1Svg'
import Avatar3Svg from '@/components/svg/landing/for-sellers/Avatar3Svg'
import LayoutLanding from '@/components/layout/LayoutLanding'
import { UserRole } from '@/data/enum/UserRole'
import Icon12Svg from '@/components/svg/landing/advantages-blue/Icon12Svg'
import Icon13Svg from '@/components/svg/landing/advantages-blue/Icon13Svg'
import Icon14Svg from '@/components/svg/landing/advantages-blue/Icon14Svg'
import Icon15Svg from '@/components/svg/landing/advantages-blue/Icon15Svg'
import Icon5Svg from '@/components/svg/landing/advantages-blue/Icon5Svg'
import Icon16Svg from '@/components/svg/landing/advantages-blue/Icon16Svg'
import Icon17Svg from '@/components/svg/landing/advantages-blue/Icon17Svg'
import { useEffect } from 'react'

export default function ForSellersPage() {

  useEffect(() => {
    // Add the class to the body
    document.body.classList.add(styles.root)

    // Cleanup function to remove the class from the body when the component unmounts
    return () => {
      document.body.classList.remove(styles.root)
    }
  }, [])

  const items = [
    { icon: <Icon12Svg />, text: 'Удобный поиск пунктов приёма лома в вашем регионе' },
    { icon: <Icon13Svg />, text: 'Честное определение вида, веса и засора лома' },
    { icon: <Icon14Svg />, text: 'Рейтинг покупателей на основе клиентских оценок' },
    { icon: <Icon15Svg />, text: 'Выбор лучших условий от проверенных ломозаготовителей' },
    { icon: <Icon5Svg />, text: 'Гарантия и безопасность проводимых сделок' },
    { icon: <Icon16Svg />, text: 'Автоматизация документооборота' },
    { icon: <Icon17Svg />, text: 'Быстрые и безопасные расчеты по сделкам' },
  ]

  const deals = [
    {
      image: '/img/landing/for-sellers/deal1-new.png', name: 'Сделки с покупателями (пунктами приёма) ',
      desc:
        <><p>Проводите сделки в режиме реального времени.</p>
          <p>
            Договаривайтесь об условиях и способах вывоза лома. Оценивайте покупателя, оставляйте отзывы.</p>
          <p>
            Получайте деньги на счет или банковскую карту.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/lot1.png',
          title: 'Сделки с покупателями (пунктами приёма) ',
          desc:
            <p>Проводите сделки по продаже лома в режиме реального времени.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/lot2.png',
          title: 'Сделки с покупателями (пунктами приёма) ',
          desc:
            <p>Договаривайтесь об условиях и способах вывоза лома. Оценивайте покупателя, оставляйте отзывы. </p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/lot3.png',
          title: 'Сделки с покупателями (пунктами приёма) ',
          desc:
            <p>Получайте деньги на счет или банковскую карту.</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal2-new.png', name: 'Продажа лома на аукционе  ',
      desc:
        <><p>Размещайте заявку на продажу лома. Покупатели найдут вас и предложат лучшую цену.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/sdelki-new.png',
          title: <>Продажа лома на<br /> аукционе</>,
          desc:
            <p>Продавец может создать заявку на продажу лома, по которой будет получать лучшие предложения от всех пунктов приёма из региона продавца.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/sdelki2-new.png',
          title: <>Продажа лома на<br /> аукционе</>,
          desc:
            <p>Пункты приёма лома делают предложения на покупку, предлагая каждый раз более выгодную цену.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/sdelki3-new.png',
          title: <>Продажа лома на<br /> аукционе</>,
          desc:
            <p>Покупатель выбирает лучшее предложение и открывает по нему сделку.</p>,
          role: UserRole.Seller
        }
      ]
    },
    {
      image: '/img/landing/for-sellers/deal3-new.png', name: 'Чаты с покупателями',
      desc:
        <><p>Обсуждайте условия сделок прямо в интерактивном мульте-чате с разными покупателями.</p>
          <p>Договаривайтесь об условиях покупки и продажи лома, торгуйтесь, выбирайте кому выгодно продать лом.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/chat.png',
          title: 'Чаты с покупателями',
          desc:
            <p>Обсуждайте условия сделок прямо в интерактивном мульте-чате с разными покупателями.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/chat2.png',
          title: 'Чаты с покупателями',
          desc:
            <p>Договаривайтесь об условиях покупки и продажи лома, торгуйтесь, выбирайте кому выгодно продать лом.</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal4-new.png', name: 'Поиск покупателей ',
      desc:
        <><p>Используйте умный поиск, находите покупателей на интерактивной карте, отправляйте запросы на покупку Ваших предложений в режиме реального времени.</p>
          <p>Получайте уведомления сервиса Ломмакркет о подходящих предложениях.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/poiskpok-new.png',
          title: 'Поиск покупателей ',
          desc:
            <p>Используйте умный поиск, находите покупателей на интерактивной карте в вашем регионе, отправляйте запросы на продажу лома в режиме реального времени. </p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/poiskpok2-new.png',
          title: 'Поиск покупателей ',
          desc:
            <p>Получайте уведомления от покупателей по своим предложениям лома.</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal5-new.png', name: 'Пункты приёма с прайс-листами',
      desc:
        <><p>Находите и анализируйте покупателей, изучайте прайс-листы пунктов приема, чтобы выгодно продать ваш лом.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/price1-new.png',
          title: <>Пункты приёма с прайс-<br />листами</>,
          desc:
            <p>Находите покупателей в своём регионе.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/price2-new.png',
          title: <>Пункты приёма с прайс-<br />листами</>,
          desc:
            <p>Изучайте прайс-листы пунктов приёма, чтобы выгодно продать лом.</p>,
          role: UserRole.Seller
        },
      ]
    },
  ]

  return (
    <LayoutLanding>
      <Advantages image={<Image1Svg className={styles.image} />}
        text={<><span style={{ display: 'inline-block' }}> Преимущества для продавцов лома,</span>
          ломосдатчиков</>} avatar={<Avatar3Svg />} />
      <AdvantagesBlue className={styles.blue} itemClass={styles.item} items={items} />
      <Deals title={'Выгодные, быстрые, удобные и безопасные сделки с помощью сервиса Ломмаркет'} items={deals} />
    </LayoutLanding>
  )
}

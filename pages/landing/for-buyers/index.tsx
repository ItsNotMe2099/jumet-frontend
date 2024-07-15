import AdvantagesBlue from '@/components/for_pages/LandingPage/AdvantagesBlue'
import Advantages from '@/components/for_pages/LandingPage/for-sellers/Advantages'
import Icon7Svg from '@/components/svg/landing/advantages-blue/Icon7Svg'
import styles from './index.module.scss'
import Deals from '@/components/for_pages/LandingPage/for-sellers/Deals'
import Image2Svg from '@/components/svg/landing/for-buyers/Image2Svg'
import Avatar4Svg from '@/components/svg/landing/for-buyers/Avatar4Svg'
import Icon2Svg from '@/components/svg/landing/advantages-blue/Icon2Svg'
import Icon9Svg from '@/components/svg/landing/advantages-blue/Icon9Svg'
import Icon10Svg from '@/components/svg/landing/advantages-blue/Icon10Svg'
import LayoutLanding from '@/components/layout/LayoutLanding'
import { UserRole } from '@/data/enum/UserRole'
import Icon18Svg from '@/components/svg/landing/advantages-blue/Icon18Svg'
import Icon19Svg from '@/components/svg/landing/advantages-blue/Icon19Svg'
import Icon16Svg from '@/components/svg/landing/advantages-blue/Icon16Svg'

export default function ForBuyersPage() {

  const items = [
    { icon: <Icon18Svg />, text: 'Увеличение доходности бизнеса' },
    { icon: <Icon2Svg />, text: 'Круглосуточный доступ клиентов к пункту приёма' },
    { icon: <Icon19Svg />, text: 'Информация об условиях приемки лома, ценах, способах вывоза ' },
    { icon: <Icon7Svg />, text: 'Рост лояльной клиентской базы' },
    //{ icon: <Icon6Svg />, text: 'Увеличит заготовку, приобретая лом на электронных торгах' },
    { icon: <Icon9Svg />, text: 'Доступ к ценам закупки лома ваших конкурентов' },
    { icon: <Icon10Svg />, text: 'Учёт всех обращений клиентов ' },
    { icon: <Icon16Svg />, text: 'Автоматизация документооборота' },
  ]

  const deals = [
    {
      image: '/img/landing/for-buyers/deal6-new.png', name: 'Предложения на продажу лома из вашего региона ',
      desc:
        <><p>Находите самые выгодные лоты на продажу лома.
          Отправляйте запросы на покупку лома не ограниченному количеству продавцов.</p></>,
      steps: [
        {
          image: '/img/landing/pokupatel/vnutr/lot-new.png',
          title: <>Предложения на продажу<br /> лома из вашего региона</>,
          desc:
            <p>Находите самые выгодные лоты на продажу лома в вашем регионе.</p>,
          role: UserRole.Buyer
        },
        {
          image: '/img/landing/pokupatel/vnutr/lot2-new.png',
          title: <>Предложения на продажу<br /> лома из вашего региона</>,
          desc:
            <p>Отправляйте запросы на покупку лома неограниченному количеству продавцов.</p>,
          role: UserRole.Buyer
        },
      ]
    },
    {
      image: '/img/landing/for-buyers/deal7-new.png', name: 'Сделки с продавцами',
      desc:
        <><p>Проводите сделки на согласованных условиях, в сервисе Ломмаркет.
        </p>
          <p>Рассчитывайтесь по сделкам быстро и безопасно.</p>
        </>,
      steps: [
        {
          image: '/img/landing/pokupatel/vnutr/sdelki-new.png',
          title: <>Сделки с продавцами</>,
          desc:
            <p>Проводите сделки на согласованных условиях в сервисе Ломмаркет.</p>,
          role: UserRole.Buyer
        },
        {
          image: '/img/landing/pokupatel/vnutr/sdelki2-new.png',
          title: <>Сделки с продавцами</>,
          desc:
            <p>Рассчитывайтесь по сделкам быстро и безопасно.</p>,
          role: UserRole.Buyer
        },
      ]
    },
    {
      image: '/img/landing/for-buyers/deal8-new.png', name: 'Чаты с продавцами. ',
      desc:
        <><p>Обсуждайте условия сделок в чатах.
        </p>
          <p>Договаривайтесь об условиях покупки и продажи лома в режиме онлайн.</p>
        </>,
      steps: [
        {
          image: '/img/landing/pokupatel/vnutr/chat1-new.png',
          title: <>Чаты с продавцами</>,
          desc:
            <p>Обсуждайте условия сделок в чатах.</p>,
          role: UserRole.Buyer
        },
        {
          image: '/img/landing/pokupatel/vnutr/chat2-new.png',
          title: <>Чаты с продавцами</>,
          desc:
            <p>Договаривайтесь об условиях покупки лома в режиме онлайн.</p>,
          role: UserRole.Buyer
        },
      ]
    },
    {
      image: '/img/landing/for-buyers/deal9-new.png', name: 'Информативные страницы ваших пунктов приёма',
      desc:
        <><p>Добавляйте неограниченное кол-во пунктов приема, регулируйте суточные лимиты потребностей в объемах лома.
        </p>
          <p>Управляйте прайс-листами покупки лома в соответствии с зонами и способами вывоза лома.</p>
        </>,
      steps: [
        {
          image: '/img/landing/pokupatel/vnutr/info1.png',
          title: <>Информативные<br /> страницы ваших пунктов<br /> приёма</>,
          desc:
            <p>Добавляйте неограниченное количество пунктов приёма и сотрудников. </p>,
          role: UserRole.Buyer
        },
        {
          image: '/img/landing/pokupatel/vnutr/info2.png',
          title: <>Информативные<br /> страницы ваших пунктов<br /> приёма</>,
          desc:
            <p>Управляйте прайс-листами в соответствии с зонами доставки. Редактируйте и добавляйте новые типы лома.</p>,
          role: UserRole.Buyer
        },
      ]
    },
    {
      image: '/img/landing/for-buyers/deal10-new.png', name: 'Подробная статистика и аналитика ',
      desc:
        <><p>Получайте и анализируйте аналитику по всем откликам и сделкам за выбранный период времени.</p>
        </>,
      steps: [
        {
          image: '/img/landing/pokupatel/vnutr/stats.png',
          title: <>Подробная статистика и<br /> аналитика</>,
          desc:
            <p>Получайте объективную аналитику по всем сделкам и откликам ваших пунктов приёма.</p>,
          role: UserRole.Buyer
        },
      ]
    },
  ]

  return (
    <LayoutLanding>
      <Advantages image={<Image2Svg className={styles.image} />}
        text={<><span style={{ display: 'inline-block' }}> Преимущества для покупателей лома,</span>
          ломозаготовителей</>} avatar={<Avatar4Svg />} />
      <AdvantagesBlue className={styles.blue} items={items} />
      <Deals title={'Увеличьте прибыль и эффективность вашего бизнеса с помощью сервиса Ломмаркет'} items={deals} />
    </LayoutLanding>
  )
}

import AdvantagesBlue from '@/components/for_pages/LandingPage/AdvantagesBlue'
import Advantages from '@/components/for_pages/LandingPage/for-sellers/Advantages'
import Icon1Svg from '@/components/svg/landing/advantages-blue/Icon1Svg'
import Icon3Svg from '@/components/svg/landing/advantages-blue/Icon3Svg'
import Icon5Svg from '@/components/svg/landing/advantages-blue/Icon5Svg'
import Icon6Svg from '@/components/svg/landing/advantages-blue/Icon6Svg'
import Icon7Svg from '@/components/svg/landing/advantages-blue/Icon7Svg'
import styles from './index.module.scss'
import Deals from '@/components/for_pages/LandingPage/for-sellers/Deals'
import Image1Svg from '@/components/svg/landing/for-sellers/Image1Svg'
import Avatar3Svg from '@/components/svg/landing/for-sellers/Avatar3Svg'
import LayoutLanding from '@/components/layout/LayoutLanding'
import { UserRole } from '@/data/enum/UserRole'

export default function ForSellersPage() {

  const items = [
    { icon: <Icon1Svg />, text: 'Покажет лучшие цены за лом с / без доставки' },
    { icon: <Icon3Svg />, text: 'Покажет рейтинг покупателя на основе опыта клиентов и отраслевых СРО' },
    { icon: <Icon5Svg />, text: 'Гарантирует проведение сделки на условиях, согласованных в сервисе Jumet' },
    { icon: <Icon7Svg />, text: 'Автоматизирует документооборот на основе данных из вашего профиля ' },
    { icon: <Icon6Svg />, text: 'Поможет провести расчеты по вашим сделкам быстро и безопасно' },
    { icon: <Icon3Svg />, text: 'Быстрое заключение сделок онлайн' },
  ]

  const deals = [
    {
      image: '/img/landing/for-sellers/deal1.png', name: 'Продажа лома на аукционе. Лоты. ',
      desc:
        <><p>Размещайте лоты на аукционе.</p>
          <p>Покупатели найдут Вас с помощью умного поиска, а также на основе рекомендаций, которые сделает сервис JUMET автоматически.</p></>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/lot1.jpg',
          desc:
            <p>Продавец может перевести любую свою заявку в лот для размещения на аукционе для получения дополнительной прибыли.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/lot2.jpg',
          desc:
            <p>Покупатели кроме заявок продавцов видят еще и лоты аукциона, что позволяет повысить эффективность закупок. </p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/chat2.jpg',
          desc:
            <p>В процессе аукциона ведутся торги за лот среди участников, это позволяет договориться о наиболее выгодных условиях по проведению сделки</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal2.png', name: 'Сделки с покупателями  ',
      desc:
        <><p>Проводите сделки в режиме реального времени.</p>
          <p>Договаривайтесь об условиях и способах вывоза лома. Оценивайте покупателя, оставляйте отзывы.</p>
          <p>Получайте деньги на счет, банковскую карту или наличными за успешные сделки.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/sdelki.jpg',
          desc:
            <p>Проводите сделки в режиме реального времени.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/sdelki2.jpg',
          desc:
            <p>Договаривайтесь об условиях и способах вывоза лома. Оценивайте покупателя, оставляйте отзывы.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/sdelki3.jpg',
          desc:
            <p>Получайте деньги на счет, банковскую карту или наличными за успешные сделки.</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal4.png', name: 'Обсуждение сделок. Чаты с покупателями.',
      desc:
        <><p>Обсуждайте условия сделок прямо в интерактивном мульте-чате с разными покупателями.</p>
          <p>Договаривайтесь об условиях покупки и продажи лома, торгуйтесь, выбирайте кому выгодно продать лом.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/chat.jpg',
          desc:
            <p>Обсуждайте условия сделок прямо в интерактивном мульте-чате с разными покупателями.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/chat2.jpg',
          desc:
            <p>Договаривайтесь об условиях покупки и продажи лома, торгуйтесь, выбирайте кому выгодно продать лом.</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal3.png', name: 'Поиск покупателей ',
      desc:
        <><p>Используйте умный поиск, находите покупателей на интерактивной карте, отправляйте запросы на покупку Ваших предложений в режиме реального времени.</p>
          <p>Получайте уведомления сервиса Jumet о подходящих покупателях для Ваших предложений.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/poiskpok.jpg',
          desc:
            <p>Используйте умный поиск, находите покупателей на интерактивной карте, отправляйте запросы на покупку Ваших предложений в режиме реального времени.</p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/poiskpok2.jpg',
          desc:
            <p>Получайте уведомления сервиса Jumet о подходящих покупателей для Ваших предложений.</p>,
          role: UserRole.Seller
        },
      ]
    },
    {
      image: '/img/landing/for-sellers/deal5.png', name: 'Пункты приема. Прайс-листы покупателей.',
      desc:
        <><p>Находите и анализируйте покупателей.</p>
          <p>Изучайте прайс-листы покупки лома пунктов приема, чтобы выгодно продать Ваш лом.</p>
        </>,
      steps: [
        {
          image: '/img/landing/prodavec/vnutr/price1.jpg',
          desc:
            <p>Находите и анализируйте покупателей. </p>,
          role: UserRole.Seller
        },
        {
          image: '/img/landing/prodavec/vnutr/price2.jpg',
          desc:
            <p>Изучайте прайс-листы покупки лома пунктов приема, чтобы выгодно продать Ваш лом.</p>,
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
      <Deals items={deals} />
    </LayoutLanding>
  )
}

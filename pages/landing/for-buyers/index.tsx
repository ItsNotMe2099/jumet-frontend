import AdvantagesBlue from '@/components/for_pages/LandingPage/AdvantagesBlue'
import Advantages from '@/components/for_pages/LandingPage/for-sellers/Advantages'
import Layout from '@/components/layout/Layout'
import Icon1Svg from '@/components/svg/landing/advantages-blue/Icon1Svg'
import Icon3Svg from '@/components/svg/landing/advantages-blue/Icon3Svg'
import Icon6Svg from '@/components/svg/landing/advantages-blue/Icon6Svg'
import Icon7Svg from '@/components/svg/landing/advantages-blue/Icon7Svg'
import styles from './index.module.scss'
import Deals from '@/components/for_pages/LandingPage/for-sellers/Deals'
import Image2Svg from '@/components/svg/landing/for-buyers/Image2Svg'
import Avatar4Svg from '@/components/svg/landing/for-buyers/Avatar4Svg'
import Icon2Svg from '@/components/svg/landing/advantages-blue/Icon2Svg'
import Icon9Svg from '@/components/svg/landing/advantages-blue/Icon9Svg'
import Icon10Svg from '@/components/svg/landing/advantages-blue/Icon10Svg'
import Icon11Svg from '@/components/svg/landing/advantages-blue/Icon11Svg'

export default function ForBuyersPage() {

  const items = [
    { icon: <Icon1Svg />, text: 'Увеличит доходность бизнеса, минуя посредников' },
    { icon: <Icon2Svg />, text: 'Организует доступ к вашим пунктам приема лома' },
    { icon: <Icon3Svg />, text: 'Проинформирует об условиях приемки, ценах и способах вывоза лома ' },
    { icon: <Icon7Svg />, text: 'Увеличит и автоматизирует клиентскую базу' },
    { icon: <Icon6Svg />, text: 'Увеличит заготовку, приобретая лом на электронных торгах' },
    { icon: <Icon9Svg />, text: 'Покажет цены закупки ваших конкурентов' },
    { icon: <Icon10Svg />, text: 'Учтет все обращения клиентов и зафиксирует их оценку работы и сервиса' },
    { icon: <Icon11Svg />, text: 'Упростит и автоматизирует документооборот с продавцами' },
  ]

  const deals = [
    {
      image: '/img/landing/for-buyers/deal6.png', name: 'Покупка лома на аукционе. Лоты.  ',
      desc:
        <><p>Находите самые выгодные лоты на аукционе Jumet.</p>
          <p>Отправляйте запросы на покупку лотов не ограниченному количеству продавцов.</p></>
    },
    {
      image: '/img/landing/for-buyers/deal7.png', name: 'Сделки с продавцами',
      desc:
        <><p>Проводите сделки на согласованных условиях, в сервисе Jumet.</p>
          <p>Рассчитывайтесь по Вашим сделкам быстро и безопасно.</p>
          <p>В спорных сделках Jumet выступит арбитражем между покупателем и продавцом.</p>
        </>
    },
    {
      image: '/img/landing/for-buyers/deal8.png', name: 'Обсуждение сделок. Чаты с продавцами. ',
      desc:
        <><p>Обсуждайте условия сделок прямо в интерактивном мульти-чате.</p>
          <p>Договаривайтесь об условиях покупки и продажи лома в режиме онлайн.</p>
        </>
    },
    {
      image: '/img/landing/for-buyers/deal9.png', name: 'Пункты приема. Прайс-листы ',
      desc:
        <><p>Добавляйте неограниченное кол-во пунктов приема, регулируйте суточные лимиты потребностей в объемах лома.</p>
          <p>Управляйте прайс-листами покупки лома в соответствии с зонами и способами вывоза лома.</p>
        </>
    },
    {
      image: '/img/landing/for-buyers/deal10.png', name: 'Стоимость отходов у конкурентов. Статистика. ',
      desc:
        <><p>Анализируйте стоимость покупки лома у конкурентов.</p>
          <p>Получайте неограниченную аналитику по всем процессам Вашего бизнеса ежедневно.</p>
        </>
    },
  ]

  return (
    <Layout landingPage>
      <Advantages image={<Image2Svg className={styles.image} />}
        text={<><span style={{ display: 'inline-block' }}> Преимущества для покупателей лома,</span>
          ломозаготовителей</>} avatar={<Avatar4Svg />} />
      <AdvantagesBlue className={styles.blue} items={items} />
      <Deals items={deals} />
    </Layout>
  )
}
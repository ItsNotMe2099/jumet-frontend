import Advantages from '@/components/for_pages/LandingPage/Advantages'
import AdvantagesBlue from '@/components/for_pages/LandingPage/AdvantagesBlue'
import HowItWorks from '@/components/for_pages/LandingPage/HowItWorks'
import HowToConnects from '@/components/for_pages/LandingPage/HowToConnects'
import Roadmap from '@/components/for_pages/LandingPage/Roadmap'
import Top from '@/components/for_pages/LandingPage/Top'
import Layout from '@/components/layout/Layout'
import Icon1Svg from '@/components/svg/landing/advantages-blue/Icon1Svg'
import Icon2Svg from '@/components/svg/landing/advantages-blue/Icon2Svg'
import Icon3Svg from '@/components/svg/landing/advantages-blue/Icon3Svg'
import Icon4Svg from '@/components/svg/landing/advantages-blue/Icon4Svg'
import Icon5Svg from '@/components/svg/landing/advantages-blue/Icon5Svg'
import Icon6Svg from '@/components/svg/landing/advantages-blue/Icon6Svg'
import Icon7Svg from '@/components/svg/landing/advantages-blue/Icon7Svg'
import Icon8Svg from '@/components/svg/landing/advantages-blue/Icon8Svg'

export default function LandingPage() {


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
    <Layout landingPage>
      <Top />
      <AdvantagesBlue items={items} />
      <HowItWorks />
      <Advantages />
      <HowToConnects />
      <Roadmap />
    </Layout>
  )
}

import Advantages from '@/components/for_pages/LandingPage/Advantages'
import AdvantagesBlue from '@/components/for_pages/LandingPage/AdvantagesBlue'
import HowItWorks from '@/components/for_pages/LandingPage/HowItWorks'
import HowToConnects from '@/components/for_pages/LandingPage/HowToConnects'
import Roadmap from '@/components/for_pages/LandingPage/Roadmap'
import Top from '@/components/for_pages/LandingPage/Top'
import Layout from '@/components/layout/Layout'

export default function LandingPage() {

  return (
    <Layout landingPage>
      <Top />
      <AdvantagesBlue />
      <HowItWorks />
      <Advantages />
      <HowToConnects />
      <Roadmap />
    </Layout>
  )
}

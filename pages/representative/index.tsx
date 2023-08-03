import RepresentativeForm from '@/components/for_pages/representative/RepresentativeForm'
//import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
import RegLayout from '@/components/for_pages/Common/RegLayout'

interface Props {

}

export default function Representative(props: Props) {

  return (
    <Layout>
      <RegLayout filter={false} title='Регистрация представителей' currentStepIndex={0}>
        <RepresentativeForm />
      </RegLayout>
    </Layout>
  )
}

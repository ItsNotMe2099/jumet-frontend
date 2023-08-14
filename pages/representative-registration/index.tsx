import Layout from '@/components/layout/Layout'

import RepresentativeRegistrationForm
  from '@/components/for_pages/representative-registration/RepresentativeRegistrationForm'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
interface Props {

}

export default function RepresentativeRegistrationPage(props: Props) {
  return (
    <Layout>
      <CenterLayout>
        <RepresentativeRegistrationForm />
      </CenterLayout>
    </Layout>
  )
}

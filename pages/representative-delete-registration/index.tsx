import Layout from '@/components/layout/Layout'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import RepresentativeDeleteRegistrationForm
  from '@/components/for_pages/representative-registration/RepresentativeDeleteRegistrationForm'
interface Props {

}

export default function RepresentativeRegistrationPage(props: Props) {
  return (
    <Layout>
      <CenterLayout>
        <RepresentativeDeleteRegistrationForm />
      </CenterLayout>
    </Layout>
  )
}

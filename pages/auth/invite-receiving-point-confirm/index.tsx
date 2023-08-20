import styles from '@/components/for_pages/login/Form/index.module.scss'
import InviteReceivingPointConfirmForm from '@/components/for_pages/auth/InviteReceivingPointConfirmForm'
import Layout from '@/components/layout/Layout'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import Heading from '@/components/ui/Heading'

interface Props {
}

export default function InviteReceivingPointConfirmPage(props: Props) {

  return (
    <Layout>
      <CenterLayout>
        <Heading>Подтверждение регистрации</Heading>
        <div className={styles.form}>
          <InviteReceivingPointConfirmForm/>
        </div>
      </CenterLayout>
    </Layout>
  )
}


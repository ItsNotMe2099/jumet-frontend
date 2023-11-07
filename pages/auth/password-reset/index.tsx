import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import Heading from '@/components/ui/Heading'
import PasswordResetForm from '@/components/for_pages/password_reset/Form'


export default function PasswordForgotPage() {
  const router = useRouter()
  const code = router.query.code as string
  const login = router.query.login as string
  return (
    <Layout>
      <CenterLayout>
        <Heading>Восстановление пароля</Heading>
        <PasswordResetForm code={code} login={login}/>
      </CenterLayout>
    </Layout>
  )
}
